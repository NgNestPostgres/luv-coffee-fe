# Documentation
- https://angular.dev
- https://medium.com/@avinashanshu.iitb/create-a-multiple-nest-package-and-publish-it-privately-and-publically-8003dde4497e

# Setup
- Instlall nvm (https://github.com/nvm-sh/nvm).
- Install Cloud SDK (https://cloud.google.com/sdk/docs/install).

- Run `nvm install 1.x.x`
- Run `nvm use xx.xx.x`
- Run `npm i -g @angular/cli`
- Run `npx husky init`

## Dependencies CLI
- `gcloud` (Google Cloud SDK)
- `node` version xx.xx.x
- `ng`

# Development
## Local development
0. Get Presonal Access Token (classic).
1. Update shared packages:
  1.1. Authenticate with personal access token (classic):
    - Run `npm login --scope=@ngnestpostgres --auth-type=legacy --registry=https://npm.pkg.github.com`
        Username: ngnestpostgres
        Password: access_token_classic
  1.2 `npm i @ngnestpostgres/packages@latest`.
2. Run local server.
3. Build ngx-shared lib:
  - run `npm run build:lib:shared` to build a lib,
  - or run `npm run build:lib:shared:watch` for ngx-shared library development.
4. Run `npm run serve:local` to start FE develoment.

## Run build locally
Run `npm i -g spa-server-gzip`
Run `npm run build:start`


# Styling
Do not use direct colors. Use only palette colors defined in _variables.scss.
Use standard mat typography classes whenever possible: https://material.angular.io/guide/typography#typography-configs-and-theming

## Angular Material
### Custom Theming
- https://angular-material.dev/courses/m2-ng-components/m2-ng-components/create-custom-theme
- Default theme - default System theme.
- Dark theme is lazy loading setup is in angular.json.

### Add Angular Material Module
1. Add module to `app/shared/shared.module.ts`.
2. Add module styles:
  - to light theme: `src/styles.scss`,
  - to dark theme: `src/styles/themes/light-theme.scss`.


# Lint
https://dev.to/digitaldino/set-up-eslint-with-angular-and-the-airbnb-style-guide-effortlessly-55a8

# Test
- Testing one file: `ng test --include='src/app/core/services/theme-manager.service.spec.ts'`.

# Library
## Library development
1. Run `npm run build:lib:shared:watch` in the first terminal.
2. Run `npm run serve:local` im the second terminal.

## Library Development Convention
````
Angular library rules (https://angular.io/guide/creating-libraries#refactoring-parts-of-an-application-into-a-library):
- Declarations such as components and pipes should be designed as stateless.
- Any observables that the components subscribe to internally should be cleaned up and disposed of during the lifecycle of those  components.
- Components should expose their interactions through inputs for providing context, and outputs for communicating events to other components.
- ...

And also:
- By convention Angular libraries should be prefixed by 'ngx-'.
- 'NgxSharedModule' should be imported in 'SharedModule'.
  ('NgxSharedModule' is not nessessary if its components are connected only via Router.)
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

### PhoneFormFieldComponent
https://material.angular.io/guide/creating-a-custom-form-field-control


# Deployment
https://cloud.google.com/appengine/docs/the-appengine-environments
Run `gcloud auth login`

## Hosting requirements
1. Server should be adjusted to serve SPA.
2. Server should do gzip.


# Optimization
## Webpack analyser ???
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

# Angular Update
1. Update manually:
npm i eslint@8 eslint-plugin-unused-imports@3 --save-dev

npm i @angular-eslint/builder@latest @angular-eslint/eslint-plugin@latest @angular-eslint/eslint-plugin-template@latest @angular-eslint/schematics@latest @angular-eslint/template-parser@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-airbnb-base@latest eslint-config-airbnb-typescript@latest eslint-plugin-simple-import-sort@latest --save-dev

# REFACTOR TO NEW STARTUP
## Change prefix
- angular.json: "prefix": "anp" to "xxx"
- .eslint.json: "prefix": "anp" to "xxx"
- Componets, Directives prefixes: CTRL+SHIFT+F "anp-" Replace to "xxx-"
- npm run lint
