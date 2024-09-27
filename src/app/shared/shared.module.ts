import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSharedModule } from '@ngx-shared';

import { TestComponent } from './components/test/test.component';
import { TestDirective } from './directives/test.directive';
import { TestPipe } from './pipes/test.pipe';

const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  NgxSharedModule,
];

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
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
