# Documentation
- https://angular.dev

# Setup
- Instlall nvm (https://github.com/nvm-sh/nvm).
- Install Cloud SDK (https://cloud.google.com/sdk/docs/install).

- Run `nvm install 1.x.x`
- Run `nvm use x.x.x`
- Run `npm i -g @angular/cli`
- Run `npm i`
- Run `npx husky init`

## Dependencies CLI
<!-- - `gcloud` (Google Cloud SDK) -->
- `node` version x.x.x
- `ng`

# Development
## Local development
0. Get Presonal Access Token (classic).
1. Update shared packages (fe-shared):
    1. Authenticate with personal access token (classic):
        - Run `npm login --scope=@ngnestpostgres --auth-type=legacy --registry=https://npm.pkg.github.com`
            Username: ngnestpostgres
            Password: access_token_classic
    2. `npm i @ngnestpostgres/fe-shared@latest` (or version you need).
2. Run local server.
3. Build ngx-shared lib:
  - run `npm run build:lib:ngx-shared` to build a lib,
  - or run `npm run build:lib:ngx-shared:watch` for ngx-shared library development.
4. Run `npm run serve:local` to start FE develoment.

## Run build locally (???)
Run `npm i -g spa-server-gzip`
Run `npm run build:start`

## PhoneFormFieldComponent
https://material.angular.io/guide/creating-a-custom-form-field-control

# Styling
Do not use direct colors. Use only palette colors defined in _variables.scss.
Use standard mat typography classes whenever possible: https://material.angular.io/guide/typography#typography-configs-and-theming

## Angular Material
### Custom Theming
- https://material.angular.io/guides
- https://angular-material.dev/courses/m2-ng-components/m2-ng-components/create-custom-theme
- Default theme - default System theme.
- Dark theme is lazy loading setup is in angular.json.

<!-- TODO: change -->
### Add Angular Material Module
1. Add module to `app/shared/shared.module.ts`. (???)
2. Add module styles:
    - to light theme: `src/styles.scss`,
    - to dark theme colors: `src/styles/themes/dark-theme.scss`,
    - to theme density: `src/styles/themes/_sizes.scss`.

# Lint
https://dev.to/digitaldino/set-up-eslint-with-angular-and-the-airbnb-style-guide-effortlessly-55a8

# Test
- Testing one file: `ng test --include='src/app/core/services/theme-manager.service.spec.ts'`.

# Library
## GitHub Registry Auth
1. Personal Access Token Classic (within the Organization)
    1. Generate `access_token_classic` for luv-coffee-fe with `read/write` and `repo/repo:status/repo_deployment/public_repo/repo:invite/security:ivents` permissions.
    2. Generate `access_token_classic` for `client` repo with `read` permissions.
    3. * In `client` repo add token as a `Actions` secret with the name `XXX_TOKEN` with value `access_token_classic`. (https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

## Library development
1. Run `npm run build:lib:ngx-shared:watch` in the first terminal.
2. Run `npm run serve:local` im the second terminal.

## Publish libraries/packages
1. Update versions in (versions are the same!!!):
    - package.json
    - packages/package.json
2. Publish from local machine:
    1. Authenticate to GitHub Registry (see [GitHub Registry Auth](#gitHub-registry-auth))
    2. Run `npm run publish:ngx-shared`.
3. Publish with GitHub Actions
(https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions#upgrading-a-workflow-that-accesses-a-registry-using-a-personal-access-token):
    - On `dev` branch create release (set as pre-release).
4. Packages can be found here: https://github.com/orgs/NgNestPostgres/packages.

## Library npm packages update
1. Manually update packages (dependencies, peerDependencies) verions according to repository (main) `package.json`.

## Library Development Convention
````
Angular library rules (https://angular.dev/tools/libraries/creating-libraries):
- Declarations such as components and pipes should be designed as stateless.
- Any observables that the components subscribe to internally should be cleaned up and disposed of during the lifecycle of those  components.
- Components should expose their interactions through inputs for providing context, and outputs for communicating events to other components.
- ...
````

## Library Assets
````
1. Add '_mixins.scss' file to 'projects/ngx-shared/styles' folder.
2. Add to 'ng-package.json':

  ng-package.json:
  -------------------------------------------------------------------------------------
  {
    ...
    "assets": ["./styles/**/*.scss"],
    ...
  }
  -------------------------------------------------------------------------------------
````

# CI
1. Get GitHub personal access token classic with `read` permissions.
2. In `luv-coffee-fe` repo add token as a `Actions` secret with the name `NPM_FE_SHARED_TOKEN` with value `access_token_classic`. (https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

# Release
1. Create release branch `release_x.y.z`.
2. Update versions in:
    - package.json (version x.y.z as release branch)
    - projects/ngx-shared/package.json (version x.y.z as release branch)
3. Make PR and merge `release_x.y.z` to `main`.
4. Make PR and merge `main` to `dev`.
5. In GitHub on `main` branch create release (to trigger packages publishing).

<!-- TODO: setup
# Deployment
https://cloud.google.com/appengine/docs/the-appengine-environments
Run `gcloud auth login`
-->

<!-- TODO setup
## Hosting requirements
1. Server should be adjusted to serve SPA.
2. Server should do gzip.
-->

# Optimization
<!-- TODO: check to obsolence
## Webpack analyser
Run `yarn add -D webpack-bundle-analyzer` (`npm i -g webpack-bundle-analyzer`).
Run `yarn build:analyze`.

## Initial invistigation. Main chunk size contributors:
````
  start main = 101.95 kB

  + CoreModule ~ 188 kB (total main = 189.17 kB)
    + HttpClientModule ~ 12 kB (total main = 102.6 kB)
    + BrowserAnimationsModule ~ 70 kB (total main = 189.17 kB)
  + NotFoundComponen + HomeComponent ~ 0.01 kB (total main = 189.18 kB)
  + AuthModule ~ 0.13 kB (total main = 189.31 kB)
  + SharedModule ~ 54 kB (total main = 243.77 kB)
    ( SharedModule with all material components ~ 121 kB (total main = 310.43 kB) )
  + AppRoutingModule ~ 112 kB (total main = 355.24 kB)
      ( AppRoutingModule without lazy modules ~ 72 kB (total main = 316.22 kB) )
    + UsersModule (empty with SharedModule) lazy module ~ 39 kB (total main = 355.16 kB)
      ( UsersModule without SharedModule ~ 35 kB (total main = 351.28 kB) )
    + CoffeesModule (empty with SharedModule) lazy module ~ 0.08 kB (total main = 355.24 kB)

  // declare in app.module.ts without including to app.component.html
  // tree shaking is working
  + TopMenuComponent ~ 0 kB (total main = 355.24 kB)
  + SidenavTreeComponent ~ 0 kB (total main = 355.24 kB)
  + SearchBoxComponent ~ 0 kB (total main = 355.24 kB)
  + ThemeToggleComponent ~ 0 kB (total main = 355.24 kB)

  + app.component.ts (with mat-toolbar, and mat-sidenav-container) ~ 243.05 kB (total main = 598.29 kB)
    + mat-sidenav-container ~ 113 kB (total main = 468.36 kB)
    + mat-toolbar ~ 129.93 kB (total main = 598.29 kB)

  total main = 598.2 kB
````
-->

# Angular Update
1. Update manually:
npm i eslint@latest
  eslint-config-google@latest
  eslint-plugin-unused-imports@latest
  eslint-plugin-simple-import-sort@latest
  @angular-eslint/builder@latest
  @angular-eslint/eslint-plugin@latest
  @angular-eslint/eslint-plugin-template@latest
  @angular-eslint/schematics@latest
  @angular-eslint/template-parser@latest
  @typescript-eslint/eslint-plugin@latest
  @typescript-eslint/parser@latest
--save-dev


# REFACTOR TO NEW STARTUP
## Change prefix
- angular.json: "prefix": "anp" to "xxx"
- .eslint.json: "prefix": "anp" to "xxx"
- Componets, Directives prefixes: CTRL+SHIFT+F "anp-" Replace to "xxx-"
- npm run lint
