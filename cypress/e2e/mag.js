/// <reference types="Cypress" />
import GlobalPreferencesPage from "../pages/GlobalPreferencesPage";
import HomePage from "../pages/HomePage";
import MyAccountPage from "../pages/MyAccountPage";
let obj = [{ user: 'Rhodes Hartley', email: 'lwrppa@magmutual.com', password: '@12345PPAL' },
{ user: 'Policy AdminLWR', email: 'lwrpadmin@magmutual.com', password: '@12345PAL' },
{ user: 'Provider LWR', email: 'providerlwr@magmutual.com', password: '@12345PL' },
{ user: 'Support LWR', email: 'supportlwr@magmutual.com', password: '@12345SL' },
{ user: 'Guest LWR', email: 'lwrguest@magmutual.com', password: '@12345GL' },
]
obj.forEach(({ user, email, password }) => {


  describe(`${user} - Manage Prefernce`, function () {
    const homePage = new HomePage();
    const myAccountPage = new MyAccountPage();
    const globalPreferencesPage = new GlobalPreferencesPage();
    beforeEach(() => {
      // cy.loginSessions('lwrppa@magmutual.com','@12345PPAL')
      //cy.visit('https://www.dev.magmutual.com/');
      //cy.get('a[href="/login/"]').click();
      cy.loginToAuth0('https://www.dev.magmutual.com/', email, password);
      //cy.visit('https://dev.magmutual.com')
    })

    it(`Verify if ${user} navigate to manage preference page and see the data`, () => {
      //cy.visit('https://dev.magmutual.com');


      homePage.getMyAccountLink().click()
      myAccountPage.getPageTitle().should('contain.text', 'My Account');
      myAccountPage.getLoggedUserName().should('include.text', user);
      myAccountPage.getManagePreferenceLink().click({ force: true });
      cy.wait(5000);
      globalPreferencesPage.getIframe()
        .then(function ($iframe) {
          const $body = $iframe.contents().find('body')
          cy.wrap($body).find('section.page-header h1').should('contain.text', 'Global Preferences');

          cy.wrap($body).find('.slds-grid.slds-wrap.slds-p-vertical_small').eq(0).find('div').eq(1).should('contain.text', user)
          cy.wrap($body).find('.slds-grid.slds-wrap.slds-p-vertical_small').eq(1).find('div').eq(1).should('contain.text', email)
        })
      //    cy.get('section.page-header h1').should('contain.text', 'Global Preferences');

    })
    it.skip('Verify Get A Quote link works', () => {
      //cy.visit('https://dev.magmutual.com');

      cy.get('nav ul [href="/quote/"]').click();
      cy.get('.quote-full-width-block-module--textContainer--6edef > h2').should('contain.text', 'Quote to Coverage in Minutes');
    })



  })

})