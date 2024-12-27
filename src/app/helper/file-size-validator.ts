import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export function fileSizeValidator(size?: number): ValidationErrors {
  // let one_MB = 1048576;
  let one_MB = 1 * 1024 * 1024;
  let two_MB = 2 * 1024 * 1024;

  let defaul_max_size = size && size == 1 ? one_MB : two_MB; // count in bytes

  return function (control: UntypedFormControl) {
    const file = control.value;
    if (file) {
      if (file.size > defaul_max_size) {
        return {
          fileSizeValidator: true,
        };
      } else {
        return null;
      }
    }
    return null;
  };
}
