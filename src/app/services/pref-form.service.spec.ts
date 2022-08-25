import { TestBed } from '@angular/core/testing';

import { PrefFormService } from './pref-form.service';

describe('PrefFormService', () => {
  let service: PrefFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
