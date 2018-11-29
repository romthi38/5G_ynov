import { Component, OnInit } from '@angular/core';
import { ConversationsService } from '@services/conversations.service';
import { ApiResponse } from '@models/api-response';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreateModalComponent } from '@app/conversations/components/create-modal/create-modal.component';
import { Conversation } from '@models/conversation';

@Component({
  selector: 'conversation-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css']
})
export class CreateButtonComponent implements OnInit {
  newConversation: Conversation = {
    id: null,
    label: '',
    status: 'creator',
  };
  newList: Conversation[];

  constructor(
    private conversationsService: ConversationsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  openCreateConversationModal(): void {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      width: '250px',
      data: {conv: this.newConversation}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createConversation(result);
      }
    });
  }

  createConversation(data) {
    let membersIds = [];
    let membersNames = '';
    if (data.members) {
      membersIds = data.members.map(member => member.id);
      membersNames = data.members.map(member => member.firstname).join(', ');
    }

    const postData = {
      discussionId: null,
      discussionName: data.label || `Discussion avec ${membersNames}`,
      members: membersIds,
    };

    this.conversationsService.getOrCreate(postData)
      .subscribe((res) => {
        if (res.code === 'T0007') {
          this.conversationsService.changeCurrentConversation(res.payload);
          this.newList = [res.payload];

          this.conversationsService.currentConversationsList.subscribe(list => {
            this.newList = this.newList.concat(list);
          });
          this.conversationsService.changeCurrentConversationsList(this.newList);
        } else if (res.code === 'E0004' || res.code === 'E0005') {
          this.showError(res.description);
        }
      });
  }

  private showError(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
