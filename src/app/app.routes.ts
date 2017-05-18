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
import { UsersComponent } from './pages/users';
import { BeneficiariesComponent } from './pages/beneficiaries';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './auth.guard';

const SECURE_ROUTES: Routes = [
  { path: 'perfil', component: ProfileComponent },
  { path: 'home',  component: DefaultComponent, data: { name: 'Gestão Gcriva' } },
  { path: 'usuarios',  component: UsersComponent, data: { name: 'Usuários', role: 'admin' } },
  { path: 'beneficiarios',  component: BeneficiariesComponent, data: { name: 'Beneficiarios' } },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule' },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule' }
];

export const ROUTES: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', component: MenuComponent, canActivate: [AuthGuard], children: SECURE_ROUTES },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];
