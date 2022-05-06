import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPassForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) { }

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
              this.toastr.success("Reset link sent successfully", "Check Your Mail", {
              toastClass: 'ngx-toastr success',
            });
          }, error => {
              console.log(error);
              this.toastr.error(error.error.message, "Error....!!!", {
              toastClass: 'ngx-toastr error',
            });
          });
      }
      else {
          this.toastr.warning("Fill the login form with valid values", "Login Form Alert", {
          toastClass: 'ngx-toastr',
        });
      }
  }

  toggleRegister() {
    setTimeout(() => {
      this.toastr.info("Redirected To Register Page", "Register Form", {
      })
      this.router.navigateByUrl('/register')
    }, 1500);
  }
}




