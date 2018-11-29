import { Component, OnInit } from '@angular/core';
import { UserStatus } from '@models/user';
import { FormControl } from '@angular/forms';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'users-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.css']
})
export class ListFiltersComponent implements OnInit {
  statuses: UserStatus[] = [
    {id: 1, name: 'Connecté(e)'},
    {id: 2, name: 'Absent(e)'},
    {id: 3, name: 'Déconnecté(e)'},
  ];
  selectedStatuses = new FormControl();
  searchedLogin = new FormControl();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onStatusSelect() {
    this.usersService.changeSelectedStatuses(this.selectedStatuses.value);
  }

  onLoginSearch() {
    this.usersService.changeSearchedLogin(this.searchedLogin.value);
  }
}
