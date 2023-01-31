import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IuserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password.match.vali';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;

  returnUrl = '';

  constructor(private formBuilder:FormBuilder,private userService:UserService,private activate:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', [Validators.required, Validators.minLength(6)]],
      address:['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators:PasswordsMatchValidator('password','confirmPassword')
    }
    );

    this.returnUrl = this.activate.snapshot.queryParams.returnUrl;
  }

  get formControls(){
    return this.registerForm.controls;
  }

  register(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const formvali= this.registerForm.value;
    const user :IUserRegister = {
      name: formvali.name,
      email: formvali.email,
      password: formvali.password,
      //confirmPassword: fv.confirmPassword,
      comfirmPassword: formvali.confirmPassword,
      address: formvali.address
    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })

  }

}
