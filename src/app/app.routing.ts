import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginRegisterComponent } from './login-register/login-register.component';


const appRoutes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: LoginRegisterComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);