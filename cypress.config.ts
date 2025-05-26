import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://automationteststore.com/', 
    supportFile: "cypress/support/e2e.ts"    
  },
});
