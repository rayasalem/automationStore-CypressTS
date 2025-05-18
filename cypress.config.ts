import { defineConfig } from "cypress";
import { allureWriter } from "@shelex/cypress-allure-plugin";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://automationteststore.com/', 
    supportFile: "cypress/support/e2e.ts"
  },
});
