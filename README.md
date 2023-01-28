<p align="center">
  <a href="https://vuejs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png" width="90" alt="Vue Logo" /></a>
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="90" alt="Nest Logo" /></a>
</p>

# Monorepo starter
## NX | NestJS | Vue 3 | TypeScript 

## Description

Monorepo template with NX Workspaces, Vue 3, NestJS and TypeScript.

* [NX workspace](https://nx.dev/getting-started/intro) to manage monorepo
* Full Stack: Front-end, Back-end, Shared/Utils module packages 
* Front-end package: [Vue 3](https://vuejs.org/guide/introduction.html) | [Vite](https://vitejs.dev/guide/)
* Back-end package: [NestJS](https://docs.nestjs.com)
* Electron for desktop support
* Capacitor for mobile support
* Shared package: shared code used in all packages

## Prerequisites

Suggest to install globally in dev environment:

- [nx](https://nx.dev)
- [nest-cli](https://docs.nestjs.com/cli/overview)

## Quick start

```bash

# 1. Clone the repository
git clone https://github.com/DhivinX/nx-nestjs-vue.git

# 2. Enter your newly-cloned folder
cd nx-nestjs-vue

# 3. Install the project and build packages in libs folder
npm install

# 4. Dev: Run frontend with hot reload 
npm run web:dev

# 5. Dev: Run backend with hot reload 
# Note that you need to create the .env file in the project root directory beforehand
# You can copy the .env.example file and rename it to .env
# Then you can configure database access and other server settings
npm run server:dev

# 6. Or run backend and frontend with hot reload parallel
npm run apps:dev

```

## Environment variables

### .env.example

```bash
# Front-end: API server connection configuration
VITE_WEB_DEFAULT_LOCALE="en"
VITE_WEB_API_URL="http://localhost"
VITE_WEB_API_PORT=3000

# HTTP / HTTPS server config
NEST_API_HTTP_PORT=3000
NEST_API_HTTP_SSL=false
NEST_API_HTTP_KEY=""
NEST_API_HTTP_CERT=""

# Cross-Origin Resource Sharing domain origins 
# More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
NEST_API_HTTP_CORS=["http://localhost", "http://localhost:8080", "http://localhost:8090", "app://localhost", "capacitor://localhost"]

# Keys required for hashing passwords and tokens
# They should be filled with random, unique strings
NEST_API_SECRETS_PWDSALT=""
NEST_API_SECRETS_JWT=""

# Database type: postgres, mysql, sqlite etc.
# More info: https://typeorm.io
DATABASE_TYPE="postgres"

# Database connection config
DATABASE_HOST="localhost"
DATABASE_PORT=5432

# Database name and user credentials
DATABASE_NAME=""
DATABASE_USER=""
DATABASE_PASSWORD=""

# Disable this in the production version of the application
# More info: https://typeorm.io/faq#how-do-i-update-a-database-schema
DATABASE_ENABLE_SYNC=true
```

## Volar and Visual Studio Code (Takeover Mode)

* Install [Volar](https://marketplace.visualstudio.com/items?itemName=vue.volar) extension
* In your project workspace, bring up the command palette with Ctrl + Shift + P (macOS: Cmd + Shift + P).
* Type built and select "Extensions: Show Built-in Extensions".
* Type typescript in the extension search box (do not remove @builtin prefix).
* Click the little gear icon of "TypeScript and JavaScript Language Features", and select "Disable (Workspace)".
* Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.

More info here: https://vuejs.org/guide/typescript/overview.html#takeover-mode

## Top-Level Scripts
 
* `apps:dev` - run front-end and back-end simultaneously with hot reload
* `web:dev` - run front-end with hot reload
* `web:electron:dev` - run front-end in electron app with hot reload
* `web:electron:build` - build electron app with frontend
* `mobile:dev` - run mobile front-end with hot reload
* `mobile:android` - build front-end and sync android project
* `server:dev` - run back-end with hot reload
* `server:seed` - seed script for server
* `build` - build all packages
* `test` - run tests for all packages
* `clean` - remove dist directory
* `lint` - lint all packages
* `dep-graph` - patch nx dep graph for vue files and open the project graph of the workspace in the browser

## Visual Studio Code extensions

```json

{
  "recommendations": [
    "nrwl.angular-console",
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "editorconfig.editorconfig",
    "syler.sass-indented",
    "eamodio.gitlens",
    "aaron-bond.better-comments",
    "visualstudioexptteam.vscodeintellicode",
    "pkief.material-icon-theme",
    "mikestead.dotenv",
    "firsttris.vscode-jest-runner"
  ]
}

```

### Required

* `nrwl.angular-console` - Nx Console
* `vue.volar` - Vue Language Features (Volar)
* `syler.sass-indented` - Sass syntax highlighting.
* `dbaeumer.vscode-eslint` - VS Code ESLint extension.
* `editorconfig.editorconfig` - EditorConfig for VS Code.

### Optional

* `eamodio.gitlens` - GitLens - Git supercharged.
* `mikestead.dotenv` - DotENV - Support for dotenv file syntax
* `visualstudioexptteam.vscodeintellicode` - IntelliCode
* `pkief.material-icon-theme` - Material Icon Theme in VS Code
* `aaron-bond.better-comments` - Better Comments

## Enhancements and Bug Reports

If you find a bug, or have an enhancement in mind please post [issues](https://github.com/DhivinX/nx-nestjs-vue/issues) on GitHub.

## License

MIT
