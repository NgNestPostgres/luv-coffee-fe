import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@auth/services/auth.service';

import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginDialogComponent, unknown>>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  describe('closeForm', () => {
    it('should close the dialog without data', () => {
      component.closeForm();
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });
  });
});
