# Documentation

# Dependencies
- `gcloud` (Google Cloud SDK)
- `node` version xx.xx.x
- `yarn`, version xx.xx.x
- `ng`


# Local Development
Install project according to `README.md` in the root.

## Run local FE development
1. In luv-coffee-be:
  - run `yarn serve:docker` to start up local server,
  - or run `yarn build:fe-shared` to just build a shared library.
2. Build ngx-shared lib:
  - run `yarn build:lib:shared`to build a lib,
  - or run `yarn build:lib:shared:watch` for ngx-shared library development.
2. Run `yarn start` to start FE develoments.

## Run build locally
Run `yarn add -D spa-server-gzip` (`npm install -g spa-server-gzip`)
Run `yarn build:start`

# Styling
Do not use direct colors. Use only palette colors defined in _variables.scss.
Use standard mat typography classes whenever possible: https://material.angular.io/guide/typography#typography-configs-and-theming

# Angular Material
Default theme - dark
## Add Angular Material Module
1. Add module to `app/shared/shared.module.ts`.
2. Add module styles:
  - to `src/styles/custom-themes/dark-theme.scss`,
  - and to `src/styles/custom-themes/light-theme.scss`


# Library
## Library development
1. Run `yarn build:lib:shared:watch` in the first terminal.
2. Run `yarn start` im the second terminal.

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

## Library Import
If Angular app is importing library from another Angular app, then it should preserve symlink:
````
  angular.json:
  -------------------------------------------------------------------------------------
    "luv-coffee-fe": {
      ...
      "architect": {
        "build": {
          ...
            "preserveSymlinks": true
  -------------------------------------------------------------------------------------

  tsconfig.json:
  -------------------------------------------------------------------------------------
  {
    ...
    "compilerOptions": {
      ...
      "paths": {
        "@angular/*": [
          "./node_modules/@angular/*"
        ],
  -------------------------------------------------------------------------------------

  // NOT VALID. REMOVE!!!!!
  shared.module.ts
  -------------------------------------------------------------------------------------
  import { NgxSharedComponenet } from '@ng-nest-postgre/luv-coffee-fe/dist/ngx-shared';
  -------------------------------------------------------------------------------------
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

3. Use from any Angular app in the workspace:

  styles.scss
  -------------------------------------------------------------------------------------
  @use '@ng-nest-postgre/luv-coffee-fe/dist/ngx-shared/styles/mixins';
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

# REFACTOR TO NEW STARTUP
## Change prefix
- angular.json: "prefix": "anp" to "xxx"
- .eslint.json: "prefix": "anp" to "xxx"
- Componets, Directives prefixes: CTRL+SHIFT+F "anp-" Replace to "xxx-"
- npm run lint
