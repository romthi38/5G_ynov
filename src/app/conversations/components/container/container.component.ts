import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConversationsService } from '@services/conversations.service';
import { ApiResponse } from '@models/api-response';
import { Message } from '@models/message';
import { Conversation } from '@models/conversation';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  messages: Message[];
  conversation: Conversation;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private conversationsService: ConversationsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getConversation(params.id);
    });

    this.conversationsService.currentConversation.subscribe(conv => {
      this.conversation = conv;
    });
  }

  getConversation(id): void {
    const data = {
      discussionId: id,
      discussionName: null,
      members: [],
    };

    this.conversationsService.getOrCreate(data)
      .subscribe( (res: ApiResponse) => {
        this.conversationsService.changeCurrentConversation(res.payload);
      });
  }
}
