import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/index';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})

export class RegisterationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  showPass = true;

  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', [ Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')]],
        lastName: ['', [ Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')]],
        emailId: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
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
    if (this.registerForm.valid) {
      let reqData = {
          firstName : this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          emailId: this.registerForm.value.emailId,
          password: this.registerForm.value.password
        }
        this.userService.registration(reqData).subscribe((response:any)=>{
            console.log("Registered the user successfully", response);
        }, error => {
          console.log(error)
      });
    }
  }
  
}
