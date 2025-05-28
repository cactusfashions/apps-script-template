# Apps Script Template

A basic template for building Google Apps Script projects.

## Project Overview

This project provides a starting point for building Google Apps Script projects. It includes a basic directory structure, configuration files, and a sample script.

## Directory Structure

* `src/`: Source code directory
	+ `Code.gs`: Main script file
	+ `appsscript.json`: Apps Script configuration file
* `scripts/`: Script directory
	+ `check-clasp.js`: Script to check and install clasp globally
* `.claspignore`: Clasp ignore file
* `.prettierrc`: Prettier configuration file
* `package.json`: npm package file

## Configuration

* `appsscript.json`: Configures the Apps Script project settings, such as timezone and runtime version.
* `.claspignore`: Specifies files and directories to ignore when deploying the project.
* `.prettierrc`: Configures Prettier settings for code formatting.

## Scripts

* `format`: Runs Prettier to format code in the `src/` directory.
* `postinstall`: Checks and installs clasp globally.

## Dependencies

* `@google/clasp`: Google Apps Script CLI tool
* `prettier`: Code formatting tool

## Getting Started

1. Clone the repository: `git clone https://github.com/cactusfashions/apps-script-template.git`
2. Install dependencies: `npm install`
3. Configure your Apps Script project settings in `appsscript.json`
4. Write your script in `Code.gs`
5. Format your code: `npm run format`
6. Deploy your project: `clasp deploy`