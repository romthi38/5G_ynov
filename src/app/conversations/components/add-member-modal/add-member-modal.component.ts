import { Component, Inject, OnInit } from '@angular/core';
import { ConversationsService } from '@services/conversations.service';
import { ApiResponse } from '@models/api-response';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CreateButtonComponent } from '@app/conversations/components/create-button/create-button.component';
import { CreateConversationModalData } from '@models/create-conversation-modal-data';
import { UsersService } from '@services/users.service';
import { User } from '@models/user';
import { Conversation } from '@models/conversation';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  availableUsersList: User[];
  members: Array<number>;
  convMembersIds: Array<number>;
  conversation: Conversation;

  constructor(
    public dialogRef: MatDialogRef<CreateButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateConversationModalData,
    private conversationsService: ConversationsService,
    private usersService: UsersService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getConversation();
  }

  getAllUsers(): void {
    this.usersService.getAll()
      .subscribe((res: ApiResponse) => {
        this.availableUsersList = res.payload.filter(user => !this.convMembersIds.includes(user.id));
      });
  }

  addMembers() {
    const data = {
      discussionId: this.data.conv.id,
      newMembers: this.members,
    };

    this.conversationsService.addMembers(data)
    .subscribe((res: ApiResponse) => {
      if (res.code === 'T0008') {
        this.showSnack(res.description);
        this.getConversation();
      } else if (res.code === 'E0006' || res.code === 'E0005') {
        this.showSnack(res.description);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private getConversation() {
    const postData = {
      discussionId: this.data.conv.id || null,
      discussionName: this.data.conv.label || null,
      members: [],
    };

    this.conversationsService.getOrCreate(postData)
      .subscribe((res) => {
        if (res.code === 'T0006') {
          this.conversation = res.payload;
          this.convMembersIds = this.conversation.members.map(member => member.id);
          this.getAllUsers();
        } else if (res.code === 'E0004' || res.code === 'E0005') {
          this.showSnack(res.description);
        }
      });
  }

  private showSnack(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
