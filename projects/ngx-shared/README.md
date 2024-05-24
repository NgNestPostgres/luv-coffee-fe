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

3. Use from any Angular app in the workspace:

  styles.scss
  -------------------------------------------------------------------------------------
  @use '@ng-nest-postgre/luv-coffee-fe/dist/ngx-shared/styles/mixins';
  -------------------------------------------------------------------------------------

````