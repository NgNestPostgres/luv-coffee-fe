import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSharedModule } from '@ngx-shared';

// import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
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
  // GoogleMapsModule,
  MatAutocompleteModule,
  MatButtonModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatDatepickerModule,
  MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatSelectModule,
  MatSidenavModule,
  // MatSliderModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  // MatTabsModule,
  MatToolbarModule,
  // MatTooltipModule,
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
