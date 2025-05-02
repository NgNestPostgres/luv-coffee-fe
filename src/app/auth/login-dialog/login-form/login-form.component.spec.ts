import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthState } from '@auth/interfaces/auth-state.enum';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    fixture.componentRef.setInput('authState', AuthState.NotStarted);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
