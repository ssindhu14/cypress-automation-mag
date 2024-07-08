const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 80000,
  experimentalFetchPolyfill:true,
  reporter: 'cypress-mochawesome-reporter', // for HTML Reports
  video:true,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 1
  },
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    ignoreVideos: false,
    videoOnFailOnly: true
  },
  experimentalSessionAndOrigin: true,
  experimentalNetworkStubbing: true,
  chromeWebSecurity: false,
  //testIsolation: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); // for HTML Reports
      screenshotOnRunFailure = true;
    },
    specPattern: 'cypress/e2e/*.{js,jsx,ts,tsx}'

  },
});
