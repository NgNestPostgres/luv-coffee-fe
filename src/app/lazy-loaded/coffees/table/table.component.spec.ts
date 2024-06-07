import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CoffeeService } from '../services/coffee.service';
import { TableComponent } from './table.component';

const testData = {};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockCoffeeService: jasmine.SpyObj<CoffeeService>;

  beforeEach(async () => {
    mockCoffeeService = jasmine.createSpyObj(['getCoffees']);
    mockCoffeeService.getCoffees.and.returnValue(of(testData));

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [{ provide: CoffeeService, useValue: mockCoffeeService }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(mockCoffeeService.getCoffees).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });
});
