// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginSessions', (email, password) => {
  //cy.session([email, password], () => {
    cy.visit('https://www.dev.magmutual.com');
    cy.get('a[href="/login/"]').click();
    //cy.wait(8000)
    cy.origin('https://magmutual-develop.auth0.com', { args: [email, password] }, ([email, password]) => {
      //if (cy.get(".login-id").should('exist')) {
      cy.wait(6000)
        cy.get('input[name="username"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('.auth0-lock-submit').click();
        //cy.wait(10000)


     // }

    });
    cy.origin('https://magmutual.my.idaptive.app', () => {
      cy.wait(10000)
      cy.get('#usernameForm input[name="username"]').type('sinbanathan');
      cy.get('#usernameForm button[type="submit"] button[type="submit"]').click()
    })
    cy.get('[href="/logout/"]').should('to.be.visible');
  //});
});

Cypress.Commands.add('lwrLogin', (email, password) => {
  //cy.session([email, password], () => {
    cy.visit('https://magmutual-develop.auth0.com/samlp/eshSln4Ow7EN1G4k8uLa095LNX4ULT3f?connection=Username-Password-Authentication');
    //cy.origin('https://magmutual-develop.auth0.com', { args: [email, password] }, ([email, password]) => {
      
        cy.get('#username').type(email);
        cy.get('._button-login-id').click();
        cy.get('#password').type(password);
        cy.get('._button-login-password').click();
        window.localStorage.setItem("oid", '00DDP000006EQjY');
        window.localStorage.setItem("oinfo", 'c3RhdHVzPURlbW8mdHlwZT1QZXJmb3JtYW5jZStFZGl0aW9uJm9pZD0wMEREUDAwMDAwNkVRalk=');
        window.localStorage.setItem("saml_request_id", '_2CAAAAZDaC5npMDAwMDAwMDAwMDAwMDAwAAAA-vr7Cq2S0_EeL1MvLZqCJefN999Gd33RWifrwAY4w-DPamdSQzPn4uub8vap6iZvYMDkiPrJMr059aY-3AelkXmrBa54Mq8h2eWund6bweh4LkqVHgCudtfiPeiDhQ7u1HKkJsS3FE_NVDG87lXgX4B0qBVeDSTSntMh7aGaCELmulGba5YyOy8DQk7EoLOLdoeEILmThyIKg-JkRevv8ygAz0NQf0qY0D-wUjGpPijgjaCJUI43l1mon4IrVuM9Rw');
        window.localStorage.setItem("sid", '00DDP000006EQjY!AQcAQC.dPE0MUoYJhJsFLESAY0QLVDXklBJXdyjiY1OHUbV.dPjPeIffb6q_.anzIaIvyA0kVr8JgonM92r33GRoX1zVABsU');
        window.localStorage.setItem("sid_Client", 'P000008LfHbP000006EQjY');
       
   // });
   
    //cy.get('[href="/logout/"]').should('to.be.visible');
  //});
})

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});





//auth0

// cypress/support/auth-provider-commands/auth0.ts

function loginViaAuth0Ui(host, username, password) {
  // App landing page redirects to Auth0.
  cy.visit(host);
  //cy.get('a[href="/login/"]').click();
  //cy.wait(5000)
  // Login on Auth0.
  cy.on('uncaught:exception', (err, runnable) => {
    return false
})
  cy.origin(
    'https://magmutual-develop.auth0.com',
    { args: { username, password } },
    ({ username, password }) => {
      //if(cy.get('main.login-id').)
      cy.get('body').then(($body)=>{
        if($body.find('main.login-id').length > 0){
          // auth0 new design

          cy.get('input[name="username"]').type(username)
          cy.get('button._button-login-id').click()
          cy.get('input[name="password"]').type(password, { log: false })
          cy.get("button._button-login-password").click()
        }
        else{
          // auth0 old
          cy.get('input[name="email"]').type(username)
      cy.get('input[name="password"]').type(password, { log: false })
      cy.get(".auth0-lock-submit").click()
        }
      })
      
    }
  )

  // Ensure Auth0 has redirected us back to the RWA.
  
  cy.url().should('equal', host)
  //console.log(cy.url());
}

Cypress.Commands.add('loginToAuth0', (host,username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  const args = { username, password };
  
  //cy.get('a[href="/login/"]').click();
   /*cy.session(
     `auth0-${username}`,
     () => {*/
     
      
      loginViaAuth0Ui(host, username, password);

   /*  },
     {
       validate: () => {
         // Validate presence of access token in localStorage.
         cy.window().its("localStorage").invoke("getItem", "authState").should("exist");
       },
     }
  );*/
  

  log.snapshot('after')
  log.end()
})