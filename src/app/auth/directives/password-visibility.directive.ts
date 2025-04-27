import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[anpPasswordVisibility]',
})
export class PasswordVisibilityDirective {
  isPasswordVisible = output<boolean>();

  @HostListener('mousedown')
  @HostListener('touchstart')
  clickStart(): void {
    this.isPasswordVisible.emit(true);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  public clickEnd(): void {
    this.isPasswordVisible.emit(false);
  }
}
