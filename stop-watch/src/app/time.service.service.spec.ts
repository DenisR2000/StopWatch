import { TestBed } from '@angular/core/testing';

import { Time.ServiceService } from './time.service.service';

describe('Time.ServiceService', () => {
  let service: Time.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Time.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
