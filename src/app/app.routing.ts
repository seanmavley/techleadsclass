import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { VerifyEmailComponent } from './verify/verify-email.component';
import { NotVerifiedComponent } from './login-register/not-verified.component';
import { AuthGuard } from './providers/auth-guard.service';

const appRoutes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: LoginRegisterComponent },
  { path: 'not-verified', component: NotVerifiedComponent },
  { path: 'verify-email/:token', component: VerifyEmailComponent },
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);