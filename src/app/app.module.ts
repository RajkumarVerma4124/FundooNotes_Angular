import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { IconsComponent } from './components/icons/icons.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AvatarModule } from "ngx-avatar";
import { TakenoteComponent } from './components/takenote/takenote.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { GetallnotesComponent } from './components/getallnotes/getallnotes.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthguardService } from './services/authguardServices/authguard.service';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    RegisterationComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    IconsComponent,
    DashboardComponent,
    TakenoteComponent,
    DisplaynoteComponent,
    GetallnotesComponent,
    UpdatenoteComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      closeButton: true,
      enableHtml: false,
      tapToDismiss: false,
      titleClass: 'alert-title',
      messageClass: 'alert-message',
      positionClass: 'toast-bottom-center',
      disableTimeOut: false,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      extendedTimeOut: 500,
    }), // ToastrModule added
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule, 
    AvatarModule,
    MatTooltipModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [
    AuthguardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
