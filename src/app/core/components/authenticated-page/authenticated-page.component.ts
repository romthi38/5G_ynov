import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { UsersService } from '@services/users.service';
import { User } from '@models/user';
import { MatRipple, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authenticated-page',
  templateUrl: './authenticated-page.component.html',
  styleUrls: ['./authenticated-page.component.scss']
})
export class AuthenticatedPageComponent implements OnInit {
  user: User;
  randomBackground: string;
  randomHomeBtn: string;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usersService.currentLoggedInUser.subscribe(user => {
      this.user = user;
    });

    this.usersService.changeLoggedInUser(this.usersService.getLoggedIn());

    this.randomBackground = `url(/src/assets/img/pusheen/${this.getRdmPusheen()}.png)`;
    this.randomHomeBtn = `/src/assets/img/pusheen/${this.getRdmPusheen()}.png`;
  }

  getRdmPusheen(): number {
    return Math.ceil(Math.random() * 9);
  }

  goToBackoffice() {
    this.router.navigate(
        [{ outlets: { authenticatedRouter: ['backoffice'] } }],
        {relativeTo: this.route},
    );
  }
}
