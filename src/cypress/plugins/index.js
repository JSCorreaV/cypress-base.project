module.exports = (on, config) => {
    // `config` is the resolved Cypress config
    // require('cypress-grep/src/plugin')(config);

    on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.args.push('--another-arg');
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            launchOptions.args.push('--disable-dev-shm-usage');
            launchOptions.args.push(
                '--disable-features=SameSiteByDefaultCookies',
            );
        }

        return launchOptions;
    });
    // require('cypress-terminal-report/src/installLogsPrinter')(on);
    return config;
};
