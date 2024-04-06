import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, take, catchError, of, Observable } from 'rxjs';

import { UsersService } from '../services/users.service';

export const uniqueUsernameValidator =
  (service: UsersService): AsyncValidatorFn =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkUniqueUsername(control.value).pipe(
      map((value) => (value ? { notUnique: true } : null)),
      take(1),
      catchError(() => of(null)),
    );
  };
