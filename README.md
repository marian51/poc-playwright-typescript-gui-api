# 🎭 Playwright with Typescript PoC project

## About project

This is a *proof-of-concept* (PoC) project based on the **Playwright** framework for creating and running automated tests.

## Project setup

### Requirements

To run this project, you need to install:

- nodejs (`20.14.0` should be fine)
- (optionally) git

### Installation

1. Download (clone) this repository to a local folder
2. Navigate to the downloaded project directory (`poc-playwright-typescript-gui-api`)
3. (optionally) Switch to the appropriate branch (command `git checkout <branch_name>`)
4. Install all required libraries and dependencies (command `npm install`)
5. Install Playwright's *browsers* (command `npx playwright install`; Playwright has it own implementations of browsers that are used for running tests)

### Before running

- *content will be added here in the future*

## Running tests

The basic command to run tests is:

```bash
npx playwright test
```
The command above will run all tests (or only tests marked as `.only`, see [Playwright's documentation](https://playwright.dev/docs/api/class-test#test-only) for details).

This basic command can take different arguments and parameters - see [Playwright's documentation](https://playwright.dev/docs/test-cli#introduction) for details.
