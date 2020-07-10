import { TestBed } from '@angular/core/testing';

import { PractionerpostService } from './practionerpost.service';

describe('PractionerpostService', () => {
  let service: PractionerpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractionerpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
