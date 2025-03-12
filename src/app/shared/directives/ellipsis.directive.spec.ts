import {ElementRef} from '@angular/core';
import {inject} from '@angular/core/testing';

import {EllipsisDirective} from './ellipsis.directive';

describe('EllipsisDirective', () => {
  it('should create an instance', () => {
    inject([ElementRef], (elementRef: ElementRef) => {
      const directive = new EllipsisDirective(elementRef);
      expect(directive).toBeTruthy();
    });
  });
});
