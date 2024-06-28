class GlobalPreferencesPage{
    getIframe(){
        return cy.get('iframe[title="Preference Center"]')
    }
    
}
export default GlobalPreferencesPage;