import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CustomFormValidationDirective } from '../../directives/custom-form-validator.directive';

import {
  FormControlsEnum,
  UserInterface,
  UserTypeEnum,
} from '../../models/users.model';
import { UsersService } from '../../services/users.service';
import { UsersConfig } from '../../config/users.config';
import { UserConfigPipe } from '../../pipes/user-config.pipe';
import { matchValidator } from '../../validators/match-validator';
import { uniqueUsernameValidator } from '../../validators/unique-username-validator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    CustomFormValidationDirective,
    NgIf,
    AsyncPipe,
    JsonPipe,
    UserConfigPipe,
  ],
  templateUrl: './create-update-user.component.html',
  styleUrl: './create-update-user.component.scss',
})
export class CreateUpdateUserComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  public formControlList = Object.keys(FormControlsEnum) as FormControlsEnum[];
  public userForm: FormGroup;
  public selectedUser: UserInterface | null;
  public userType = UserTypeEnum;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toast: ToastrService,
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.subs.sink = this.usersService.selectedUser$.subscribe(
      (selectedUser) => {
        this.selectedUser = selectedUser;
        this.updateUserForm();
      },
    );
  }

  onCreateUpdateUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.usersService
      .createUpdateUser(this.userForm.value as UserInterface)
      .subscribe(
        () => {
          this.toast.success('Success Message');
          this.usersService.hasUserOpen$.next(false);
        },
        () => this.toast.error('Error Message'),
      );
  }

  onDeleteUser(userName: string) {
    this.usersService.deleteUser(userName).subscribe(
      () => {
        this.toast.success('Success Message');
        this.usersService.hasUserOpen$.next(false);
      },
      () => this.toast.error('Error Message'),
    );
  }

  onClose() {
    this.usersService.hasUserOpen$.next(false);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initializeForm() {
    this.userForm = this.formBuilder.group({}, { validators: matchValidator });

    for (const control of this.formControlList) {
      const value = this.selectedUser ? this.selectedUser[control] : null;

      this.userForm.addControl(
        control,
        new FormControl(value, UsersConfig[control].validators),
      );
    }
  }

  private updateUserForm() {
    const { username, password, confirmedPassword } = FormControlsEnum;
    const usernameControl = this.userForm.get(username);

    if (this.selectedUser) {
      this.userForm.patchValue({
        ...this.selectedUser,
        [confirmedPassword]: this.selectedUser[password],
      });

      usernameControl?.clearAsyncValidators();
      usernameControl?.updateValueAndValidity();
    } else {
      this.userForm.reset();
      usernameControl?.addAsyncValidators(uniqueUsernameValidator(this.usersService));
    }
  }
}
