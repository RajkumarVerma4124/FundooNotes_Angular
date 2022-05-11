import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { GetallnotesComponent } from './components/getallnotes/getallnotes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthenticationGuard } from './authentication.guard'
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'register', component: RegisterationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthenticationGuard],
    children: [
      { path: '', redirectTo: '/dashboard/notes', pathMatch: 'full' },
      { path: 'notes', component: GetallnotesComponent },
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
