import { TestBed } from '@angular/core/testing';

import { NextMatchService } from './next-match.service';

describe('NextMatchService', () => {
  let service: NextMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
