/// <reference types="cypress" />

describe('Index tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('');
        cy.fixture('indexData.json').as('indexData');
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

        it('With explicit wait - waiting for loading icons', function () {
            cy.get('[data-ui=load-data-button').click();
            cy.contains('Loading...').should('be.visible');
            cy.contains('Loading...', { timeout: 10000 }).should('not.exist');
            cy.get('table tbody tr:nth-child(1)').should(
                'contain.text',
                'John'
            );
        });
    });

    describe('Date picker', () => {
        it('Current Date Test', function () {
            // const {
            //     currentDateData: { date, datepickerTitle },
            // } = this.indexData;
            const date = '23/07/2019';
            const datepickerTitle = 'Datepicker';

            cy.get('.m-4:nth-child(1)').should('have.text', datepickerTitle);
            cy.get('.input-group .form-control').should('be.empty').type(date);
        });

        it('Start Date Test', function () {
            // const {
            //     startDateData: { startDate, newDate },
            // } = this.indexData;
            const startDate = '2018-07-22';
            const newDate = '2023-04-17';

            cy.get('input#start.form-control').should('have.value', startDate);
            cy.get('input#start.form-control').click().type(newDate);
        });
    });

    describe('Chart and tooltips', () => {
        it('Chart test', function () {
            const chartTitle = 'Charts and tooltips';

            cy.get('.m-4').should('contain.text', chartTitle);

            cy.get('canvas#myChart', { timeout: 10000 }).should('be.visible');
        });
    });
});
