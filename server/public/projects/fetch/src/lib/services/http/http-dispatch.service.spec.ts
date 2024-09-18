import { TestBed } from '@angular/core/testing';

import { HttpDispatchService } from './http-dispatch.service';

describe('HttpService', () => {
  let service: HttpDispatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDispatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
