/// <reference types="Cypress" />
import GlobalPreferencesPage from "../pages/GlobalPreferencesPage";
import HomePage from "../pages/HomePage";
import MyAccountPage from "../pages/MyAccountPage";
let obj = [{ user: 'Rhodes Hartley', email: 'lwrppa@magmutual.com', password: '@12345PPAL' },
{ user: 'Provider LWR', email: 'providerlwr@magmutual.com', password: '@12345PL' },
{ user: 'Guest LWR', email: 'lwrguest@magmutual.com', password: '@12345GL' },
]
obj.forEach(({ user, email, password }) => {


  describe(`${user} - Manage Prefernce`, function () {
    const homePage = new HomePage();
    const myAccountPage = new MyAccountPage();
    const globalPreferencesPage = new GlobalPreferencesPage();
    beforeEach(() => {
      cy.loginToAuth0('https://www.dev.magmutual.com/', email, password);
    })

    it(`Verify if ${user} navigate to manage preference page and see the data`, () => {
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

    })

  })

})