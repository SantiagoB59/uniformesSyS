import { TestBed } from '@angular/core/testing';

import { ProceduresService } from './procedures.service';

describe('ProceduresService', () => {
  let service: ProceduresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProceduresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
