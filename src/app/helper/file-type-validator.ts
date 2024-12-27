import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export function fileType(validate: string): ValidationErrors {
  return (control: UntypedFormControl) => {
    const file = control.value;
    if (file) {
      const validTypes = validate.replace(/\s/g, '').split(',');
      let validator = false;
      for (const type of validTypes) {
        validator =
          validator || new RegExp(type.replace('*', '.*')).test(file.type);
      }
      if (!validator) {
        return {
          fileType: true,
        };
      }
      return null;
    }
    return null;
  };
}
