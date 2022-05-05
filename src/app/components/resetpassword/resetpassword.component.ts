import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/index';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPassForm!: FormGroup;
  submitted = false;
  showPass = true;
  token : any;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
        confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
            validator: MustMatch('newPassword', 'confirmPassword')
        });
    this.token = this.activeRoute.snapshot.paramMap.get('token');
  }

   // convenience getter for easy access to form fields
  get f() { return this.resetPassForm.controls; }

  showPassword(){
    this.showPass = !this.showPass;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPassForm.valid) {
        let reqData = {
          newPassword: this.resetPassForm.value.newPassword,
          confirmPassword: this.resetPassForm.value.confirmPassword
        }
        this.userService.resetPassword(reqData,this.token).subscribe((response:any)=>{
            console.log("Password changed successfully", response);
        }, error => {
          console.log(error)
      });
      }
  }

}
