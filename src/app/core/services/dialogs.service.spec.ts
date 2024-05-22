import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogsService } from './dialogs.service';

describe('DialogsService', () => {
  let service: DialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    });
    service = TestBed.inject(DialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
