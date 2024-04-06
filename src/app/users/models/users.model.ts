export enum FormControlsEnum {
  username = 'username',
  first_name = 'first_name',
  last_name = 'last_name',
  email = 'email',
  user_type = 'user_type',
  password = 'password',
  confirmedPassword = 'confirmedPassword',
}

export enum UserTypeEnum {
  Admin = 'Admin',
  Driver = 'Driver',
}

export interface UserInterface {
  [FormControlsEnum.username]: string;
  [FormControlsEnum.first_name]: string;
  [FormControlsEnum.last_name]: string;
  [FormControlsEnum.email]: string;
  [FormControlsEnum.user_type]: string;
  [FormControlsEnum.password]: string;
  [FormControlsEnum.confirmedPassword]?: string;
}

export interface UserConfigInterface {
  displayName: string;
  widthOnTable: string;
  validators: any;
  type: string;
  readonly: boolean;
}
