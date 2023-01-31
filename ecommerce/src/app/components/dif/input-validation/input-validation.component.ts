import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MASS:any = {
  required:'This field is required',
  email:'Email is not valid',
  minlength:'Field must be at least too short',
  passwordMatch:'Passwords do not match'
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!:AbstractControl;

  @Input()
  showErrors : boolean = true;
  error: string[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    });
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      //this.errors = Object.keys(errors).map(key => VALIDATORS_MASS[key]);
      this.error = [];
      return;
    }
    const keys = Object.keys(errors);
    this.error = keys.map(key => VALIDATORS_MASS[key]);

  }

}
