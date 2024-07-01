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

- Reading sensitive data in the project, such as login data (username, password, API key etc.) is done by using the [`➡️dotnev`](https://github.com/motdotla/dotenv) tool. The data is read from `.env` file located in the project's root folder. This file is ignored by git for security reasons and is not in the project. This file has to be added from another source, or created yourself.

  List of variables read from `.env` file:
  - `USER_NAME`
  - `PASSWORD`
  - `API_KEY`
  - `BASE_TEAM_ID` 

## Running tests

### Basic way to run tests

The basic command to run tests is:

```bash
npx playwright test
```
The command above will run all tests (or only tests marked as `.only`, see [Playwright's documentation](https://playwright.dev/docs/api/class-test#test-only) for details).

This basic command can take different arguments and parameters - see [Playwright's documentation](https://playwright.dev/docs/test-cli#introduction) for details.

### Custom running scripts

In the `package.json` file, the `scripts` field contains predefined scripts. These are aliases for longer configurations of run commands and so are possible:

- To run all tests **in headed mode**:

  ```bash
  npm test
  ```

- To run all tests **in headless mode**:

  ```bash
  npm run test-headless
  ```

- To run only tests with specified tag `tag_name`:
  
  ```bash
  npm run test-tag --tag="tag_name"
  ```

## Notes

- to run Jenkins, you should install `Docker Pipeline` and `Docker plugin` plugins