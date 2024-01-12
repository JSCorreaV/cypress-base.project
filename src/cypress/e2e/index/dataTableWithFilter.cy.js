/// <reference types="Cypress" />
import IndexFacade from '../../facades/IndexFacade';

import { metricsTableFormats } from '../../support/utils/formats';
describe('Data Table With Sorting and Filter Test', () => {
    beforeEach(() => {
        cy.fixture('dataTableWithFilterData.json').as(
            'dataTableWithFilterData'
        );
    });
    it('The user should be able to see All, 2024-01-01, 2024-01-02, 2024-01-03 options in filter when clicks.\
    The user should see, at most, 10 rows in table per pagination with cell values in the expected format.', function () {
        const indexPage = new IndexFacade().getIndexPage();

        const {
            filterBy: { options },
            columns,
        } = this.dataTableWithFilterData;
        const minRowsPerPagination = 1;
        const maxRowsPerPagination = 10;

        indexPage.clickFilterDropdown();
        indexPage.getDropdownItems().should('deep.equal', options);

        indexPage.getPaginationNumberButton().each(() => {
            indexPage.getTableElements().then((tableElements) => {
                columns.forEach((metric) => {
                    const type = metric.type;
                    const label = metric.displayName;
                    const metricColumn = tableElements[label];
                    cy.wrap(metricColumn)
                        .should('have.length.at.most', maxRowsPerPagination)
                        .and('have.length.at.least', minRowsPerPagination);
                    cy.wrap(metricColumn).each((metricValue) => {
                        switch (type) {
                            case 'decimal': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DECIMAL
                                );
                                break;
                            }
                            case 'currency': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.CURRENCY
                                );
                                break;
                            }
                            case 'integer': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.INTEGER
                                );
                                break;
                            }
                            case 'decimalAndPercentage': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DECIMAL_AND_PERCENTAGE
                                );
                                break;
                            }
                            case 'date': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.DATE
                                );
                                break;
                            }
                            case 'percentage': {
                                cy.wrap(metricValue).should(
                                    'match',
                                    metricsTableFormats.PERCENTAGE
                                );
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    });
                });
            });
            indexPage.clickNextPaginationButton();
        });
    });
});
