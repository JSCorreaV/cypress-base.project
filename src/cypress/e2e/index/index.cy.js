/// <reference types="cypress" />

describe('Index tests', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('Selects incorrect dropdown option', function () {
        cy.get('.dropbtn').click();
        cy.contains('#myDropdown a', 'Link').should('have.text', 'Link');
    });

    it('Selects correct dropdown option', function () {
        const option = 'Link';
        const dropdownOptionRegex = new RegExp(`^${option}$`, 'm');
        cy.get('.dropbtn').click();
        cy.contains('#myDropdown a', dropdownOptionRegex).click();
    });
});
