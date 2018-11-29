import { Component, OnInit } from '@angular/core';
import { Conversation } from '@models/conversation';
import { ApiResponse } from '@models/api-response';
import { ConversationsService } from '@services/conversations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { environment } from '@env/environment';
import { CreateModalComponent } from '@app/conversations/components/create-modal/create-modal.component';
import { AddMemberModalComponent } from '@app/conversations/components/add-member-modal/add-member-modal.component';

@Component({
  selector: 'conversations-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  conversations: Conversation[];
  filteredConversations: Conversation[];

  constructor(
    private conversationsService: ConversationsService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllConversations();

    this.conversationsService.currentConversationsList.subscribe(list => {
      this.conversations = list;
      this.filteredConversations = list;
    });
  }

  getAllConversations(): void {
    this.conversationsService.getAll()
      .subscribe((res: ApiResponse) => {
        this.conversationsService.changeCurrentConversationsList(res.payload);
        this.filteredConversations = res.payload;
      });
  }

  showConversation(conv): void {
    this.conversationsService.changeCurrentConversation(null);
    this.router.navigate(
        [{ outlets: { authenticatedRouter: ['conversation', conv.id] } }],
        {relativeTo: this.route},
    );

    const membersIds = conv.members.map(member => member.id);
    const postData = {
      discussionId: conv.id,
      discussionName: conv.label,
      members: membersIds,
    };

    // Get de la conversation cliquée
    this.conversationsService.getOrCreate(postData)
      .subscribe((res) => {
        this.conversationsService.changeCurrentConversation(res.payload);
      });
  }

  leaveOrDeleteConv(conv): void {
    const data = {
      discussionId: conv,
      force: conv.status === 'creator',
    };
    this.conversationsService.leave(data)
      .subscribe((res: ApiResponse) => {
        if (res.code === 'T0010') {
          this.showSnack(res.description);
          this.getAllConversations();
        } else if (res.code === 'E0007' || res.code === 'E0008') {
          this.showSnack(res.description);
        }
      });
  }

  openAddMemberModal(conv): void {
    const dialogRef = this.dialog.open(AddMemberModalComponent, {
      data: {conv},
    });
  }

  private showSnack(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
