import IndexPage from '../pageObject/IndexPage';

export default class IndexFacade {
    getIndexPage() {
        cy.visit('');
        return new IndexPage();
    }
}
