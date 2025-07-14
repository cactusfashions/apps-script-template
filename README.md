<div align="center">

# APPS-SCRIPT-TEMPLATE  
*Empower Automation, Simplify Workflows, Unlock Potential*

![last-commit](https://img.shields.io/github/last-commit/cactusfashions/apps-script-template?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/cactusfashions/apps-script-template?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/cactusfashions/apps-script-template?style=flat&color=0080ff)

*Built with the tools and technologies:*

![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)

---

## Overview

**apps-script-template** is a developer-focused toolkit that simplifies building, deploying, and managing Google Apps Script projects within the Google Workspace ecosystem. It provides a structured foundation for automation, data handling, and consistent project configuration.

**Why apps-script-template?**

This project accelerates your Google Apps Script development with core features that ensure reliability and efficiency:

- 🛠️ **Automation & Workflow Management:** Seamlessly automate tasks and orchestrate workflows across Google Workspace tools.
- 📊 **Google Sheets Data Handling:** Robust interfaces for creating, updating, and managing spreadsheet data with error resilience.
- 🔧 **Environment & Deployment Automation:** Simplifies setup with scripts to manage the clasp CLI and project configurations.
- 💬 **Standardized Responses & Error Handling:** Consistent success and error messaging for reliable client-server interactions.
- ⚙️ **Configurable Project Settings:** Maintains code quality and compatibility with strict TypeScript configurations and platform-specific settings.

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript  
- **Package Manager:** Npm

### Installation

Build apps-script-template from the source and install dependencies:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/cactusfashions/apps-script-template


2. **Navigate to the project directory:**

   ```sh
   cd apps-script-template

3. **Install the dependencies using npm:**

   ```sh
   npm install
   
4. **Configure your Apps Script project settings in: `appsscript.json`**

5. **replace you script id `.clasp.json`:**

6. **Write your script in `Code.gs`**

7. **Format your code:**

   ```sh
   npm run format
  
9. **push your project:**
   
   ```sh
   clasp push
   
10. **read documnetation here: [npm-clasp](https://www.npmjs.com/package/@google/clasp)**
11. **Deploy your project:**

 	```sh
   	clasp deploy

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
