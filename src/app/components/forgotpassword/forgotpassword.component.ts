import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPassForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

 ngOnInit() {
  this.forgotPassForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2,4})+[.]?([a-zA-Z]{2,3})*$')]],
  });
}

//convenience getter for easy access to form fields
  get f() { return this.forgotPassForm.controls; }

  onSubmit() {
      this.submitted = true;
  }
}



