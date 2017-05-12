import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { HomeComponent } from './pages/home';
import { AboutComponent } from './pages/about';
import { LoginComponent } from './pages/login';
import { ResetPasswordComponent } from './pages/reset-password';
import { ForgotComponent } from './pages/forgot';
import { DefaultComponent } from './pages/default';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './auth.guard';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'home',  component: DefaultComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'login', component: LoginComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'default', component: DefaultComponent, canActivate: [AuthGuard] },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];
