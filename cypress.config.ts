import { defineConfig } from "cypress";

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
