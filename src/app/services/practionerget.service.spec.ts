import { TestBed } from '@angular/core/testing';

import { PractionergetService } from './practionerget.service';

describe('PractionergetService', () => {
  let service: PractionergetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractionergetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
