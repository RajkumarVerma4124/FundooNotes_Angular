import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../index';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})

export class RegisterationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  showPass = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', [ Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')]],
        lastName: ['', [ Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')]],
        emailId: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2,4})+[.]?([a-zA-Z]{2,3})*$')]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
        confirmPassword: ['', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
            validator: MustMatch('password', 'confirmPassword')
        });
  }
  
  //convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  showPassword(){
    this.showPass = !this.showPass;
  }

  onSubmit() {
    this.submitted = true;
  }
  
}
