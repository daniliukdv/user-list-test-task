import { FormControlsEnum, UserConfigInterface } from '../models/users.model';
import { Validators } from '@angular/forms';
import { matchValidator } from '../validators/match-validator';

type UserConfigRecord = Record<FormControlsEnum, UserConfigInterface>;

export const UsersConfig: UserConfigRecord = {
  [FormControlsEnum.username]: {
    displayName: 'Username',
    widthOnTable: '150px',
    validators: { validators: Validators.compose([Validators.required]) },
    type: 'text',
    readonly: true,
  },
  [FormControlsEnum.first_name]: {
    displayName: 'First name',
    widthOnTable: '150px',
    validators: Validators.compose([Validators.required]),
    type: 'text',
    readonly: false,
  },
  [FormControlsEnum.last_name]: {
    displayName: 'Last name',
    widthOnTable: '150px',
    validators: Validators.compose([Validators.required]),
    type: 'text',
    readonly: false,
  },
  [FormControlsEnum.email]: {
    displayName: 'Email',
    widthOnTable: '150px',
    validators: Validators.compose([Validators.required, Validators.email]),
    type: 'email',
    readonly: false,
  },
  [FormControlsEnum.user_type]: {
    displayName: 'Type',
    widthOnTable: '150px',
    validators: Validators.compose([Validators.required]),
    type: 'select',
    readonly: false,
  },
  [FormControlsEnum.password]: {
    displayName: 'Password',
    widthOnTable: '150px',
    validators: Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    ]),
    type: 'password',
    readonly: false,
  },
  [FormControlsEnum.confirmedPassword]: {
    displayName: 'Confirm password',
    widthOnTable: '150px',
    validators: Validators.compose([
      Validators.required,
      matchValidator(FormControlsEnum.password),
    ]),
    type: 'password',
    readonly: false,
  },
};
