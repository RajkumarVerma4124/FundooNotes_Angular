import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPassForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService) { }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group({
        emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
    });
  }

    //convenience getter for easy access to form fields
  get f() { return this.forgotPassForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.forgotPassForm.valid) {
        let reqData = {
            emailId: this.forgotPassForm.value.emailId,
          }
          this.userService.forgotPassword(reqData).subscribe((response:any)=>{
              console.log("Reset link sent successfully", response);
          }, error => {
              console.log(error)
          });
      }
  }
}




