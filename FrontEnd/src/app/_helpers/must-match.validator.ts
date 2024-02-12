import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
ValidatorFn
} from "@angular/forms";


export interface MatchOtherValidationError extends ValidationErrors {
  matchOther: {
    otherValue: string;
  };
}

export interface MatchOtherValidatorOptions {
  otherControlFn: () => AbstractControl;
}

export function MatchOtherValidator({otherControlFn}: MatchOtherValidatorOptions): ValidatorFn {


  return (control: AbstractControl): MatchOtherValidationError | null => {


    const otherControl: ReturnType<typeof otherControlFn> = otherControlFn();
    if (!otherControl) {
      return null;
    }

    return control?.value !== otherControl.value
          ? {
              matchOther: {
                otherValue: otherControl.value
              }
            }
          : null;

  };
}

