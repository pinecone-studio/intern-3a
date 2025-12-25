/* eslint-disable @typescript-eslint/no-var-requires */
const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    ...nxE2EPreset(__filename),
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    supportFolder: './cypress/support',
    supportFile: './cypress/support/e2e.js',
    specPattern: ['./cypress/e2e/**/*.cy.js', './cypress/e2e/**/*.cy.ts'],
    screenshotsFolder: './cypress/results/assets',
    videosFolder: './cypress/results/assets',
    viewportWidth: 1536,
    viewportHeight: 960,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 100000,
    responseTimeout: 120000,
    screenshotOnRunFailure: true,
    numTestsKeptInMemory: 0,
    trashAssetsBeforeRuns: true,
    baseUrl: 'http://localhost:4200/',
    retries: 2,
    reporter: '../../node_modules/cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        reportDir: './cypress/results',
        overwrite: false,
        html: true,
        json: true,
      },
    },
  },
});
