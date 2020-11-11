import { TestBed } from '@angular/core/testing';

import { LoadSpinnerInterceptor } from './load-spinner.interceptor';

describe('HttpRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadSpinnerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadSpinnerInterceptor = TestBed.inject(LoadSpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
