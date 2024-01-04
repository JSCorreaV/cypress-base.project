# cypress-base.project

## Setup
First, setup de `npm` project

```bash
npm init -y
```

Installing `node` for Mac (prerequisite `nvm`)
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

To run the test based on the environment run:

```bash
npm run cy:open:local # For example
```

```bash

```

```bash

```

```bash

```
