import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User, UserStatus } from '../../../models/user';
import { ApiResponse } from '@models/api-response';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[];
  filteredUsers: User[];
  usersFilters = {
    login: [],
    status: [],
  };
  statusColor: Object;
  getOnlinesInterval;

  constructor(
      private usersService: UsersService,
      public snackBar: MatSnackBar,
  ) {
    this.statusColor = {
      1: 'success',
      2: 'warning',
      3: 'danger',
    };
  }

  ngOnInit() {
    this.usersService.currentSelectedStatuses.subscribe(statuses => {
      this.usersFilters.status = statuses;
      this.filteredUsers = this.filterList(this.users, this.usersFilters);
    });
    this.usersService.currentSearchedLogin.subscribe(login => {
      this.usersFilters.login = [login];
      this.filteredUsers = this.filterList(this.users, this.usersFilters);
    });

    this.getAllUsers();

    this.getOnlinesInterval = setInterval(() => this.getConnectedUsers(), 20000);
  }

  ngOnDestroy() {
    clearInterval(this.getOnlinesInterval);
  }

  getAllUsers(): void {
    this.usersService.getAll()
      .subscribe((res: ApiResponse) => {
        this.users = res.payload;
        this.filteredUsers = this.users;
      });
  }

  getConnectedUsers(): void {
    this.usersService.getConnected()
      .subscribe((res: ApiResponse) => {
        const newConnected = [];
        const connectedUsers = res.payload;
        let disconnectedNumber = 0;

        this.users.map(user => {
          const connectedUser = connectedUsers.find(u => u.id === user.id);

          if (connectedUser) {
            if (connectedUser.status.id === 1 && user.status.id !== connectedUser.status.id) {
              newConnected.push(connectedUser.login);
            }
          } else {
            if (user.status.id !== 3) {
              disconnectedNumber += 1;
            }
          }

          // Si on ne trouve pas l'user dans la liste des connectés, alors on passe son statut à déconnecté
          user.status = (connectedUser) ? connectedUser.status : {id: 3, name: 'Déconnecté(e)'};

          return user;
        });

        if (newConnected.length > 0 || disconnectedNumber > 0) {
          this.createGetConnectedInfosMessage(newConnected, disconnectedNumber);
        }
      });
  }

  filterList(arr: Object[], filters: Object): Array<any> {
    if (!arr) {
      return;
    }

    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
      return filterKeys.every(eachKey => {
        // Si on passe un tableau vide, ou un tableau avec une chaine vide, on ignore le filtre
        if (!filters[eachKey].length || filters[eachKey][0] === '') {
          return true;
        }

        // Si on filtre sur un objet contenant un Id, alors on filtre sur cet id
        if ((eachObj[eachKey] || {}).id) {
          return filters[eachKey].includes(eachObj[eachKey].id);
        }

        // Si on filtre sur une string, alors on vérifie que cette chaine contient la valeur du filtre
        if (typeof eachObj[eachKey] === 'string') {
          return eachObj[eachKey].includes(filters[eachKey][0]);
        }

        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  }

  createGetConnectedInfosMessage(newConnected, disconnectedNumber) {
    const verb = newConnected.length > 1 ? 'sont' : 'est';
    const newConnectedStr = newConnected.join(', ');
    const newConnectedPart = newConnected.length > 0 ? `${newConnectedStr} ${verb} désormais en ligne.` : '';

    const isPlural = disconnectedNumber > 1;
    const disconnectedPart = disconnectedNumber > 0 ? `${disconnectedNumber} utilisateur${isPlural ? 's' : ''} ${isPlural ? 'se sont' : 's\'est'} déconnecté${isPlural ? 's' : ''}.` : '';

    const message = `${newConnectedPart} ${disconnectedPart}`;

    if (newConnectedPart || disconnectedPart) {
      this.showConnectedInfosMessage(message);
    }
  }

  showConnectedInfosMessage(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }
}
