import { Pipe, PipeTransform } from '@angular/core';
import { UsersConfig } from '../config/users.config';
import { FormControlsEnum, UserConfigInterface } from '../models/users.model';

@Pipe({
  name: 'userConfig',
  standalone: true,
})
export class UserConfigPipe implements PipeTransform {
  transform(value: FormControlsEnum, key: keyof UserConfigInterface) {
    return UsersConfig[value][key];
  }
}
