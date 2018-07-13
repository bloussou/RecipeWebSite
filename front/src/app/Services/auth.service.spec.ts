import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

// Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
describe('AuthService', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        {
          provide: HttpClient,
          useValue: httpSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
