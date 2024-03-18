const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,

  env: {
    // insert bearer token here
    access_token: "",
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
    
    baseUrl: "https://gorest.co.in",
  },
});
