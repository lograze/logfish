import { TestBed } from '@angular/core/testing';

import { ClickhouseService } from './clickhouse.service';

describe('ClickhouseService', () => {
  let service: ClickhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
