import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSharedModule } from '@ngx-shared';

import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

import { TestComponent } from './components/test/test.component';

import { TestDirective } from './directives/test.directive';

import { TestPipe } from './pipes/test.pipe';

const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  NgxSharedModule,
];

const ANGULAR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTreeModule,
];

const SHARED_COMPONENTS = [
  TestComponent
];

const SHARED_DIRECTIVES = [
  TestDirective
];

const SHARED_PIPES = [
  TestPipe
];


@NgModule({
  imports: [
    ANGULAR_MATERIAL_MODULES,
    SHARED_MODULES,
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES,
  ],
  exports: [
    ANGULAR_MATERIAL_MODULES,
    SHARED_MODULES,
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES,
  ]
})
export class SharedModule { }
