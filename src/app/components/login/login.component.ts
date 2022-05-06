import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPass = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  showPassword() {
    this.showPass = !this.showPass;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let reqData = {
        emailId: this.loginForm.value.emailId,
        password: this.loginForm.value.password
      }
      this.userService.login(reqData).subscribe((response: any) => {
        console.log("User login successfull", response);
        localStorage.setItem("token", response.token);
        this.toastr.success("User login successfull", "Login Form Success", {
          toastClass: 'ngx-toastr success',
        });
      }, error => {
        console.log(error);
        this.toastr.error(error.error.message, "Error....!!!", {
          toastClass: 'ngx-toastr error',
        });
      });
    } else {
      this.toastr.warning("Fill the login form with valid values", "Login Form Alert", {
        toastClass: 'ngx-toastr',
      });
      // this.loginForm.reset();
    } 
  }

  toggleRegister(){
      setTimeout(() => {
        this.toastr.info("Redirected To Register Page", "Register Form", {
      })
        this.router.navigateByUrl('/register')
    }, 1500);
  }

  toggleForgotPass() {
    setTimeout(() => {
      this.toastr.info("Redirected To Forgot Password Page", "Forgot Password Form", {
      })
      this.router.navigateByUrl('/forgotpassword')
    }, 1500);
  }
}
