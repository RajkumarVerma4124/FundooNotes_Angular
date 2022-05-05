import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/index';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPassForm!: FormGroup;
  submitted = false;
  showPass = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
        confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
            validator: MustMatch('newPassword', 'confirmPassword')
        });
  }

   // convenience getter for easy access to form fields
  get f() { return this.resetPassForm.controls; }

  showPassword(){
    this.showPass = !this.showPass;
  }

  onSubmit() {
    this.submitted = true;
  }

}
