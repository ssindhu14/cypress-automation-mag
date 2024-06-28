class MyAccountPage{
    getPageTitle(){
        return cy.get('main h2')
    }
    getLoggedUserName(){
        return cy.get('div nav[aria-label="Secondary menu"] p')
    }
    getManagePreferenceLink(){
        return cy.get('div nav[aria-label="Secondary menu"] p a')
    }
}

export default MyAccountPage;