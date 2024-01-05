/// <reference types="cypress" />

describe('Index tests', () => {
    beforeEach(() => {
        cy.visit('');
    });

    describe('Using regex to select similar elements', () => {
        it('Selects incorrect dropdown option', function () {
            cy.get('[data-ui=dropdown]').click();
            cy.contains('.dropdown-menu a', 'Link').should('have.text', 'Link');
        });

        it('Selects correct dropdown option', function () {
            const option = 'Link';
            const dropdownOptionRegex = new RegExp(`^${option}$`, 'm');
            cy.get('[data-ui=dropdown]').click();
            cy.contains('.dropdown-menu a', dropdownOptionRegex).should(
                'have.text',
                'Link'
            );
        });
    });

    describe('Waiting for elements to load', () => {
        it('Without explicit wait', function () {
            cy.get('[data-ui=load-data-button').click();
            cy.get('table tbody tr:nth-child(1)').should(
                'contain.text',
                'John'
            );
        });

        it.only('With explicit wait - waiting for loading icons', function () {
            cy.get('[data-ui=load-data-button').click();
            cy.contains('Loading...').should('be.visible');
            cy.contains('Loading...', { timeout: 10000 }).should('not.exist');
            cy.get('table tbody tr:nth-child(1)').should(
                'contain.text',
                'John'
            );
        });
    });
});
