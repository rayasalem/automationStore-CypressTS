import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import pluginCypress from "eslint-plugin-cypress";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js, prettier: pluginPrettier, cypress: pluginCypress}, extends: ["js/recommended", "prettier","plugin:prettier/recommended"], rules:{"prettier/prettier": "error", "cypress/no-unnecessary-waiting": "warn"}, },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  {
    ...pluginReact.configs.flat.recommended,
  },
]);
