const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,

  env: {
    access_token: "0c6b5d36c54a94acf9a540b3a4c8d30aa9e6959485387dc00e8e6d7a2c02c45f",
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
    
    baseUrl: "https://gorest.co.in",
  },
});
