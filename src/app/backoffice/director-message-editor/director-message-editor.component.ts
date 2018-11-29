import { Component, OnInit } from '@angular/core';
import { BackofficeService } from '@services/backoffice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-director-message-editor',
  templateUrl: './director-message-editor.component.html',
  styleUrls: ['./director-message-editor.component.scss']
})
export class DirectorMessageEditorComponent implements OnInit {
  message: string;

  constructor(
      private backofficeService: BackofficeService,
      public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.backofficeService.getMessage()
        .subscribe((res) => {
          if (res.payload) {
            this.message = res.payload || '';
          }
    });
  }

  sendMessage() {
    const data = {
      content: this.message,
    };

    this.backofficeService.editMessage(data)
    .subscribe((res) => {
      if (res.description) {
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
