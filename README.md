# automationStore

# <p>welcome to <code>automationStore-CypressTS</code> Repo</p>

<p>welcome to <code>automationStore</code> Project , an automation testing project</p>
<p>RUN CODE</p>
# Cypress TypeScript Automation Setup

Follow these instructions to install and set up Cypress with TypeScript, linting, and Allure reporting.

---

## Step 1: Clone the repository

```bash
git clone <your-repo-url>
cd automationStore-CypressTS
```

---

## Step 2: Install npm dependencies

```bash
npm install
```

---

## Step 3: Cypress installed and added to package.json

```bash
npx cypress install
```

---

## Step 4: Folder structure created (cypress/, cypress/e2e/, cypress/support/)

Structure was created implicitly

---

## Step 5: Create `.gitignore` and exclude unwanted files

```bash
echo node_modules/ > .gitignore
echo cypress/videos/ >> .gitignore
echo cypress/screenshots/ >> .gitignore
git add .gitignore
git commit -m "Add .gitignore to exclude node_modules and Cypress artifacts"
```

---

## Step 6: Remove `node_modules` from Git tracking

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

---

## Step 7: Install latest Cypress version (optional if you want to update)

```bash
npm install cypress@latest --save-dev
```

---

## Step 8: Confirm Cypress installation version

```bash
npx cypress --version
```

---

## Step 9: Cypress cypress.config.ts configured with baseUrl

Implicit via file setup — no direct command

---

## Step 10: Environment variables configured via cypress.env.json or config file

```bash
echo { } > cypress.env.json
```

---

## Step 11: Plugins added if needed (e.g. allure reporting, etc.)

```bash
npm install -D @shelex/cypress-allure-plugin
```

---

## Step 12: Setup ESLint and Prettier for code style (optional)

```bash
npx eslint --init
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

---

## Step 13: Open Cypress Test Runner to start testing

```bash
npx cypress open
```

---

## Step 14: Run tests from CLI

```bash
npx cypress run
```

---

### Notes:

- These commands work on **Windows, Linux, and macOS**.
- Replace `<your-repo-url>` with your actual git repo URL.

---
