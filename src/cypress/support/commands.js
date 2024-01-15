// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password, preventUsingDefaultUser) => {
    cy.session(
        Cypress.env('USERNAME'),
        () => {
            cy.log('Clear Auth0 Rate Limit');

            // Performs an https request to the icanhazip.com website which returns the host ip address version 4
            cy.exec('curl -4 icanhazip.com')
                .its('stdout') // Gets the standard output of the console
                .then((ip) => {
                    cy.request({
                        // This request deletes your API from the list of blocked APIs
                        // This happens because some APIs detects several request from the same IP and block it to prevent DDoS attacks and whatnots.
                        method: 'DELETE',
                        url: `${Cypress.env(
                            'AUTH0_TENANT_URL'
                        )}/api/blocks/ips/${ip}`,
                        auth: {
                            bearer: `${Cypress.env('AUTH0_MGMT_TOKEN')}`,
                        },
                    });
                });
            if (preventUsingDefaultUser !== true) {
                username = username || Cypress.env('USERNAME');
                password = password || Cypress.env('PASSWORD');
            }

            console.log(username, password);

            cy.log('login via Auth0 with the user ' + username);

            const options = {
                method: 'POST',
                url: Cypress.env('AUTH_API'),
                body: {
                    grant_type: 'password',
                    username: username,
                    password: password,
                },
            };
            cy.request(options).then((res, err) => {
                if (err) {
                    return cy.log('There was an error with auth', err);
                }

                // cy.setCookie(`${Cypress.env('ID_COOKIE')}`, res.body.id_token, {
                //     log: false,
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: 'None',
                //     domain: '.company.com',
                // });
                // cy.setCookie('accessToken', res.body.access_token, {
                //     log: false,
                // });
            });
        },
        {
            validate() {
                cy.visit('/');
            },
            cacheAcrossSpecs: true,
        }
    );
});
