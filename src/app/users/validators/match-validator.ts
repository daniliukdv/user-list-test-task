import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchValidator = (
  matchingControlName: string,
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchingControl = control.parent?.get(matchingControlName)?.value;
    const matched = control.value === matchingControl;

    return matched ? null : { mismatch: true };
  };
}
