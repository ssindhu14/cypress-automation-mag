class HomePage{
    getMyAccountLink(){
        return cy.get('ul [href="/account/"]');
    }
}
export default HomePage;