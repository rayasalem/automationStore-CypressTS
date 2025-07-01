import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'dtvw54',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // استدعاء require داخل الدالة
      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://automationteststore.com/',
    supportFile: "cypress/support/e2e.ts",
  },
});
