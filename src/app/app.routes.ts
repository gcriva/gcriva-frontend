import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { HomeComponent } from './pages/home';
import { AboutComponent } from './pages/about';
import { LoginComponent } from './pages/login';
import { ResetPasswordComponent } from './pages/reset-password';
import { ForgotComponent } from './pages/forgot';
import { DefaultComponent } from './pages/default';
import { ProfileComponent } from './pages/profile';
import { MenuComponent } from './pages/menu';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './auth.guard';

const SECURE_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'home',  component: DefaultComponent},
  { path: 'about', component: AboutComponent},
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'login', component: LoginComponent },
  { path: 'default', component: DefaultComponent}
];

export const ROUTES: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', component: MenuComponent, canActivate: [AuthGuard], children: SECURE_ROUTES },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];
