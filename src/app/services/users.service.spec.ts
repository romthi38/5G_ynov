import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';

import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersService } from './users.service';

describe('Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        UsersService,
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  it(`Calling 'restapi/members/get-all' should return a 'T0004' code`, async(inject([UsersService, HttpTestingController],
      (service: UsersService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0004',
        };

        service.getAll().subscribe((next) => {
          expect(next.code).toBe('T0004');
        });

        backend.expectOne(environment.api_routes.users_get_all).flush(dummyResponse);
      })));

  it(`Calling 'restapi/members/get-onlines' should return a 'T0005' code`, async(inject([UsersService, HttpTestingController],
      (service: UsersService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0005',
        };

        service.getConnected().subscribe((next) => {
          expect(next.code).toBe('T0005');
        });

        backend.expectOne(environment.api_routes.users_get_onlines).flush(dummyResponse);
      })));
});
