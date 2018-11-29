import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      if (res.code === 'T0003') {
        this.snackBar.open(res.description, '', {
          duration: 4000,
        });
      }
    });
  }
}
