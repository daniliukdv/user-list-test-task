import { Injectable } from '@angular/core';
import {
  FormControlsEnum,
  UserInterface,
  UserTypeEnum,
} from '../models/users.model';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';

const USERS: UserInterface[] = (() => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      [FormControlsEnum.username]: `mperry1992${i}`,
      [FormControlsEnum.first_name]: 'Mattew',
      [FormControlsEnum.last_name]: 'Perry',
      [FormControlsEnum.email]: 'matthew@mail.com',
      [FormControlsEnum.user_type]: UserTypeEnum.Admin,
      [FormControlsEnum.password]: 'U12345678',
    });
  }

  return users;
})();
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: UserInterface[] = [];

  public selectedUser$ = new Subject<UserInterface | null>();
  public users$ = new BehaviorSubject<UserInterface[]>([]);
  public hasUserOpen$ = new BehaviorSubject<boolean>(false);

  selectUser(user: UserInterface | null) {
    this.selectedUser$.next(user);
  }

  checkUniqueUsername(key: string): Observable<boolean> {
    const notUnique = this._users.find((user) => user.username === key);
    return of(!!notUnique);
  }

  createUpdateUser(user: UserInterface): Observable<UserInterface> {
    return of(user).pipe(
      tap(() => {
        const index = this._users.findIndex(
          ({ username }) => username === user.username,
        );

        if (index !== -1) {
          this._users[index] = { ...user };
        } else {
          this._users.push(user);
        }

        this.selectUser(null);
        this._updateUsersOnUI();
      }),
    );
  }

  deleteUser(username: string): Observable<string> {
    return of(username).pipe(
      tap(() => {
        const index = this._users.findIndex(
          (user) => user.username === username,
        );
        this._users.splice(index, 1);

        this.selectUser(null);
        this._updateUsersOnUI();
      }),
    );
  }

  getUsers(): Observable<UserInterface[]> {
    return of([...USERS]).pipe(
      tap((users) => {
        this._users = users;
        this._updateUsersOnUI();
      }),
    );
  }

  private _updateUsersOnUI() {
    this.users$.next(this._users);
  }
}
