const { defineConfig } = require('cypress');

module.exports = defineConfig({
    chromeWebSecurity: false,
    numTestsKeptInMemory: 1,
    projectId: '8vb812bn',
    trashAssetsBeforeRuns: false,
    viewportHeight: 1920,
    viewportWidth: 1080,
    waitForAnimations: true,
    video: true,
    retries: 0,
    videoCompression: 0,
    responseTimeout: 90000,
    requestTimeout: 30000,
    env: {
        USERNAME: 'XXXX',
        PASSWORD: 'XXXX',
        CLIENT_ID: 'XXXX',
        CLIENT_SECRET: 'XXXX',
        ID_COOKIE: 'XXXX',
        AUTH0_MGMT_TOKEN: 'XXXX',
    },
    e2e: {
        setupNodeEvents(on, config) {
            // require('cypress-terminal-report/src/installLogsPrinter')(on);
            return require('./cypress/plugins/index.js')(on, config);
        },
        baseUrl: 'http://127.0.0.1:5500/src/app/',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
});
