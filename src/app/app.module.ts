import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpModule } from '@angular/http';
// Component Imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NotVerifiedComponent } from './login-register/not-verified.component';
import { VerifyEmailComponent } from './verify/verify-email.component';

// Providers
import { AuthenticationService } from './providers/auth.service';
import { AuthGuard } from './providers/auth-guard.service';
import { CodeService } from './providers/code.service';

import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    LoginRegisterComponent,
    NotVerifiedComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecaptchaModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRouting
  ],
  providers: [AuthenticationService, AuthGuard, CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
