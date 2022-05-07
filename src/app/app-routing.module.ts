import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {path: 'register', component: RegisterationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
