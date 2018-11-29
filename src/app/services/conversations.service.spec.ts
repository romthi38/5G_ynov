import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConversationsService } from './conversations.service';
import { environment } from '../../environments/environment';

describe('Discussions', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        ConversationsService,
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  it(`Calling 'restapi/discussions/get-or-create' should return a 'T0006' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0006',
        };

        service.getOrCreate({}).subscribe((next) => {
          expect(next.code).toBe('T0006');
        });

        backend.expectOne(environment.api_routes.discussions_get_or_create).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/add-member' should return a 'T0008' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0008',
        };

        service.addMembers({}).subscribe((next) => {
          expect(next.code).toBe('T0008');
        });

        backend.expectOne(environment.api_routes.discussions_add_members).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/leave' with 'force' parameter set to true should return a 'T0009' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0009',
        };

        service.leave({force: true}).subscribe((next) => {
          expect(next.code).toBe('T0009');
        });

        backend.expectOne(environment.api_routes.discussions_leave).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/leave' with 'force' parameter set to false should return a 'T0010' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0010',
        };

        service.leave({force: false}).subscribe((next) => {
          expect(next.code).toBe('T0010');
        });

        backend.expectOne(environment.api_routes.discussions_leave).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/list' should return a 'T0011' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0011',
        };

        service.getAll().subscribe((next) => {
          expect(next.code).toBe('T0011');
        });

        backend.expectOne(environment.api_routes.discussions_list).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/get-messages' should return a 'T0006' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0006',
        };
        const discussionId = 1;
        const messagesNumber = 30;

        service.getMessages(discussionId, messagesNumber).subscribe((next) => {
          expect(next.code).toBe('T0006');
        });

        backend.expectOne(`${environment.api_routes.discussions_get_messages}/${discussionId}`).flush(dummyResponse);
      })));

  it(`Calling 'restapi/discussions/post-message' should return a 'T0012' code`, async(inject([ConversationsService, HttpTestingController],
      (service: ConversationsService, backend: HttpTestingController) => {
        const dummyResponse = {
          code: 'T0012',
        };

        service.postMessage({}).subscribe((next) => {
          expect(next.code).toBe('T0012');
        });

        backend.expectOne(environment.api_routes.discussions_post_message).flush(dummyResponse);
      })));
});
