import {Routes} from '@angular/router';

import {LibDevComponent} from './lib-dev.component';
import {PhoneFormFieldHostComponent} from './phone-form-field-host/phone-form-field-host.component';

export const LIB_DEV_ROUTES: Routes = [
  {
    path: '',
    component: LibDevComponent,
    children: [
      {
        path: 'phone-form-field',
        component: PhoneFormFieldHostComponent,
      },
    ],
  },
];
