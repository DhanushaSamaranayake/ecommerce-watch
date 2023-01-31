import { AbstractControl, FormGroup } from "@angular/forms";

export const PasswordsMatchValidator = (password:string, confirmPassword:string) => {
    return (formGroup:FormGroup) => {
      const validator = (form:AbstractControl) => {
        const passwordControl = form.get(password);
        const confirmPasswordControl = form.get(confirmPassword);
        if(!passwordControl || !confirmPasswordControl) return;

        if(passwordControl.value !== confirmPasswordControl.value){
          confirmPasswordControl.setErrors({passwordsnotmatch:true});
        }else{
          const errors = confirmPasswordControl.errors;
          if(!errors) return;
          delete errors.passwordsnotmatch;
          confirmPasswordControl.setErrors(errors);

        }

      }
      return validator;
    }

}
