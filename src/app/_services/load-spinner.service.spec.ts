import { TestBed } from '@angular/core/testing';

import { LoadSpinnerService } from './load-spinner.service';

describe('LoadSpinnerService', () => {
  let service: LoadSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
