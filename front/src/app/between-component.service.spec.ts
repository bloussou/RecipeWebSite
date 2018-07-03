import { TestBed, inject } from '@angular/core/testing';

import { BetweenComponentService } from './between-component.service';

describe('BetweenComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetweenComponentService]
    });
  });

  it('should be created', inject([BetweenComponentService], (service: BetweenComponentService) => {
    expect(service).toBeTruthy();
  }));
});
