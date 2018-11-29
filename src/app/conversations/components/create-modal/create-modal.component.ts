import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateButtonComponent } from '@app/conversations/components/create-button/create-button.component';
import { CreateConversationModalData } from '@models/create-conversation-modal-data';
import { FormControl } from '@angular/forms';
import { User } from '@models/user';
import { ApiResponse } from '@models/api-response';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  usersList: User[];

  ngOnInit() {
    this.getAllUsers();
  }

  constructor(
      public dialogRef: MatDialogRef<CreateButtonComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CreateConversationModalData,
      private usersService: UsersService,
  ) {}

  getAllUsers(): void {
    this.usersService.getAll()
    .subscribe((res: ApiResponse) => {
      this.usersList = res.payload;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
