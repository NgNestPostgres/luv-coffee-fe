import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PasswordVisibilityDirective } from './password-visibility.directive';

@Component({
  template: `<div anpPasswordVisibility></div>`,
  imports: [PasswordVisibilityDirective],
})
class TestComponent {}

describe('PasswordVisibilityDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: PasswordVisibilityDirective;
  let divElement: HTMLDivElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent, PasswordVisibilityDirective],
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();

    divElement = fixture.debugElement.query(By.directive(PasswordVisibilityDirective)).nativeElement;
    directive = fixture.debugElement.query(By.directive(PasswordVisibilityDirective))
      .injector.get(PasswordVisibilityDirective);
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeInstanceOf(PasswordVisibilityDirective);
  });

  it('should emit true on mousedown', () => {
    let isVisible = false;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    divElement.dispatchEvent(new Event('mousedown'));
    expect(isVisible).toBe(true);
  });

  it('should emit true on touchstart', () => {
    let isVisible = false;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    divElement.dispatchEvent(new Event('touchstart'));
    expect(isVisible).toBe(true);
  });

  it('should emit false on mouseup', () => {
    let isVisible = true;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    // simulate mousedown to be able to trigger mouse up
    divElement.dispatchEvent(new Event('mousedown'));
    divElement.dispatchEvent(new Event('mouseup'));

    expect(isVisible).toBe(false);
  });

  it('should emit false on touchend', () => {
    let isVisible = true;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    // simulate touchstart to be able to trigger touch end
    divElement.dispatchEvent(new Event('touchstart'));
    divElement.dispatchEvent(new Event('touchend'));
    expect(isVisible).toBe(false);
  });

  it('should emit false on mouseup after mousedown', () => {
    let isVisible = true;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    divElement.dispatchEvent(new Event('mousedown'));
    expect(isVisible).toBe(true);
    divElement.dispatchEvent(new Event('mouseup'));
    expect(isVisible).toBe(false);
  });

  it('should emit false on touchend after touchstart', () => {
    let isVisible = true;
    directive.isPasswordVisible.subscribe((value) => (isVisible = value));
    divElement.dispatchEvent(new Event('touchstart'));
    expect(isVisible).toBe(true);
    divElement.dispatchEvent(new Event('touchend'));
    expect(isVisible).toBe(false);
  });
});
