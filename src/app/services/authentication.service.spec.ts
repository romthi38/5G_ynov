import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';

import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Authentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthenticationService,
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  xit(`Calling 'login' should return a 'T0001' code`, async(inject([AuthenticationService, HttpTestingController],
      (service: AuthenticationService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0001',
        };

        service.login('obiwan@mail.com', 'suadmin').subscribe((next) => {
          expect(next.code).toBe('T0001');
        });

        backend.expectOne(environment.api_routes.login).flush(dummyResponse);
      })));

  it(`Calling 'client-heart-beat' should return a 'T0002' code`, async(inject([AuthenticationService, HttpTestingController],
      (service: AuthenticationService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0002',
        };

        service.heartBeat().subscribe((next) => {
          expect(next.code).toBe('T0002');
        });

        backend.expectOne(environment.api_routes.heartbeat).flush(dummyResponse);
      })));

  xit(`Calling 'logout' should return a 'T0003' code`, async(inject([AuthenticationService, HttpTestingController],
      (service: AuthenticationService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0003',
        };

        service.logout().subscribe((next) => {
          expect(next.code).toBe('T0003');
        });

        backend.expectOne(environment.api_routes.logout).flush(dummyResponse);
      })));
});
