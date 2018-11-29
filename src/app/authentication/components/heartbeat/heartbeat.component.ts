import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatRipple, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '@services/authentication.service';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.scss']
})
export class HeartbeatComponent implements OnInit, OnDestroy {
  heartBeatInterval;
  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.heartBeatInterval = setInterval(() => {
      this.authService.heartBeat()
      .subscribe(
  res => {
          if (res.code === 'T0002') {
            this.launchRipple();
          } else if (res.code === 'E0003') {
            this.authService.logout().subscribe(logoutResponse => {
              if (logoutResponse.code === 'T0003') {
                this.snackBar.open(logoutResponse.description, '', {
                  duration: 4000,
                });
              }
            });
          }
        },
  err => this.handleError(err),
      );
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.heartBeatInterval);
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
    });

    rippleRef.fadeOut();
  }

  handleError(err) {
    this.snackBar.open(err, '', {
      duration: 4000,
    });
  }
}
