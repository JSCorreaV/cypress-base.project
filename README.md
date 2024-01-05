# cypress-base.project

## Setup

First, setup de `npm` project

```bash
npm init -y
```

Installing `node` (prerequisite `nvm`)
(We'll be using node v20.0.0 in this project)

```bash
nvm install node # Installs the latest release of node
nvm install 20.0.0 # Installs an specific version of node
```

This'll will change the current node version to the stated in the `.nvmrc` file

```bash
nvm use
```

Then install all the project's dependencies.
_This will check for all the dependencies listed in the `package.json` file._

```bash
npm install
```

## Mock App Start Up

1. Install a Visual Studio Code **Live Server** extension
2. Right click on the `src/app/index.html` and hit Open with Live Server a tab will open up in your browser
3. Make sure that `cypress.stage.config.js` `baseUrl` variable is set to the current one shown in your browser

Usually is: http://127.0.0.1:5500/src/app/

To run the test based on the environment run:

```bash
npm run cy:open:local
```

```bash

```

```bash

```

```bash

```
