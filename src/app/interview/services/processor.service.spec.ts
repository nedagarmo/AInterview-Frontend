import { TestBed } from '@angular/core/testing';

import { ProcessorService } from './processor.service';

describe('ProcessorService', () => {
  let service: ProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
