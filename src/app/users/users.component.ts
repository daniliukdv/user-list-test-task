import { Component, OnDestroy } from '@angular/core';
import { CreateUpdateUserComponent } from './components/create-update-user/create-update-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersService } from './services/users.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CreateUpdateUserComponent, UserListComponent, NgIf, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnDestroy {
  private _subs = new SubSink();

  public hasUserOpen$ = this.usersService.hasUserOpen$;

  constructor(private usersService: UsersService) {
    this._subs.sink = this.usersService.getUsers().subscribe();
  }

  onCreateUser() {
    this.usersService.hasUserOpen$.next(true);
    this.usersService.selectUser(null);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
