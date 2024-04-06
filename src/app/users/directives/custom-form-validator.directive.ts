import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersConfig } from '../config/users.config';
import { UsersService } from '../services/users.service';
import { SubSink } from 'subsink';
import { FormControlsEnum } from '../models/users.model';

@Directive({
  selector: '[appCustomFormValidation]',
  standalone: true,
})
export class CustomFormValidationDirective implements OnInit {
  @Input('appCustomFormValidation') form: FormGroup;

  private element = inject(ElementRef);
  private usersService = inject(UsersService);
  private subs = new SubSink();

  ngOnInit() {
    this.subs.sink = this.usersService.hasUserOpen$.subscribe(() => {
      this.form.markAsUntouched();
      this.validateForm();
    });
  }

  @HostListener('ngSubmit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();
    this.validateForm();
  }
  @HostListener('keyup', ['$event'])
  onInputChange(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLButtonElement;
    const errors = this.form.controls[target.id]?.errors;

    this.showErrorMessage(target.id as FormControlsEnum, errors);
    this.inputState(target.id, !!errors);
  }

  validateForm() {
    for (const control in this.form.controls) {
      const errors = this.form.controls[control].errors;
      this.showErrorMessage(
        control as FormControlsEnum,
        this.form.untouched ? null : errors,
      );
      this.inputState(control, this.form.untouched ? false : !!errors);
    }
  }

  showErrorMessage(fieldName: FormControlsEnum, errors: any) {
    const errorEl = this.element.nativeElement.querySelector(
      `#${fieldName}-error`,
    );

    if (errorEl) {
      if (!errors) {
        errorEl.textContent = '';

        return;
      }

      const errorMessages = {
        required: `${UsersConfig[fieldName].displayName} is required`,
        email: 'Please enter a valid email address.',
        pattern:
          'Must contain at least 8 characters, one number and one letter.',
        notUnique: 'Name is not unique.',
        mismatch: 'Passwords do not match.',
      } as any;

      for (const key in errors) {
        errorEl.textContent = errorMessages[key];
      }
    }
  }

  inputState(fieldName: string, hasError: boolean) {
    const inputEl = this.element.nativeElement.querySelector(`#${fieldName}`);

    if (inputEl) {
      inputEl.style.borderColor = hasError ? '#ef7da0' : '';
    }
  }
}
