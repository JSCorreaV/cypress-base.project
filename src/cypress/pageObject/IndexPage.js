/// <reference types="Cypress" />
import { parseElementsListToTextsList } from '../support/helpers';

export default class IndexPage {
    filterDropdown = '#filterDropdown';
    dropdownOptions = '.dropdown-menu.show .dropdown-item';

    dataTable = '#table2';
    tableHeaders = `${this.dataTable} .-header`;
    tableRows = `${this.dataTable} tbody tr`;

    nextPaginationButton = `${this.dataTable}_next`;
    paginationNumberButton = `${this.dataTable}_paginate > span .paginate_button`;

    getDropdownItems() {
        return cy.get(this.dropdownOptions).then(parseElementsListToTextsList);
    }

    getHeaders() {
        return cy.get(this.tableHeaders).then(parseElementsListToTextsList);
    }

    getPaginationNumberButton() {
        return cy.get(this.paginationNumberButton);
    }

    getTableElements() {
        const tableElements = {};
        return this.getHeaders().then((headers) => {
            return this.getRows().then((rows) => {
                headers.forEach((headerName, index) => {
                    tableElements[headerName] = [];
                    Array.from(rows).forEach((row) => {
                        const element = row.children[index].innerHTML;
                        tableElements[headerName].push(element);
                    });
                });
                return tableElements;
            });
        });
    }

    getRows() {
        return cy.get(this.tableRows);
    }

    clickFilterDropdown() {
        cy.get(this.filterDropdown).click();
    }

    clickNextPaginationButton() {
        cy.get(this.nextPaginationButton).click();
    }
}
