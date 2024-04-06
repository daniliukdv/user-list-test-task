import { Component } from '@angular/core';
import { FormControlsEnum, UserInterface } from '../../models/users.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UsersService } from '../../services/users.service';
import {UserConfigPipe} from '../../pipes/user-config.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgForOf, AsyncPipe, UserConfigPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  public cellKeys = Object.keys(FormControlsEnum)
    .filter(
      (k) =>
        k !== FormControlsEnum.password &&
        k !== FormControlsEnum.confirmedPassword,
    )
    .map((k) => k as keyof UserInterface);

  public users$ = this.usersService.users$;

  constructor(private usersService: UsersService) {}

  onSelectUser(user: UserInterface) {
    this.usersService.selectUser(user);
    this.usersService.hasUserOpen$.next(true);
  }
}
