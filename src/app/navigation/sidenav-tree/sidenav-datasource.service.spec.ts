import {TestBed} from '@angular/core/testing';

import {SidenavDatasourceService} from './sidenav-datasource.service';

describe('SidenavDatasourceService', () => {
  let service: SidenavDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
