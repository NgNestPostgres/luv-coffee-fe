import {
  Directive, ElementRef, HostListener, Input,
} from '@angular/core';

export enum OverflowDirection {
  Vertical,
  Horizontal
}

@Directive({
  selector: '[anpEllipsis]',
  exportAs: 'anpEllipsis',
})
export class EllipsisDirective {
  @Input('anpEllipsis') overflowDirection: OverflowDirection = OverflowDirection.Vertical;
  @Input() sizeLimit: number | undefined;

  isActive = true;

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const el = this.elementRef.nativeElement;

    if (this.overflowDirection === OverflowDirection.Horizontal) {
      const sizeForComparison = this.sizeLimit ? this.sizeLimit : el.offsetWidth;
      this.isActive = sizeForComparison < el.scrollWidth;
    } else {
      const sizeForComparison = this.sizeLimit ? this.sizeLimit : el.offsetHeight;
      this.isActive = sizeForComparison < el.scrollHeight;
    }
  }
}
