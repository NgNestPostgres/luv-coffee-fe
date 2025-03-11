import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogsService} from '@core/services/dialogs.service';

import {UsersListComponent} from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let dialogsServiceSpy: jasmine.SpyObj<DialogsService>;

  beforeEach(async () => {
    const spyDialogsService = jasmine.createSpyObj('DialogsService', ['login']);

    await TestBed.configureTestingModule({
      providers: [
        {provide: DialogsService, useValue: spyDialogsService},
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    dialogsServiceSpy = TestBed.inject(DialogsService) as jasmine.SpyObj<DialogsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dialogsServiceSpy.login).not.toHaveBeenCalled();
    expect(component).toBeTruthy();
  });
});
