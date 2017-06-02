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
import { UsersComponent, NewUserComponent } from './pages/users';
import { BeneficiariesComponent } from './pages/beneficiaries';
import { EditBeneficiariesComponent } from './pages/beneficiaries-edit';
import { ProjectsComponent } from './pages/projects';
import { EditProjectsComponent } from './pages/projects-edit';
import { CoursesComponent } from './pages/courses';
import { EditCoursesComponent } from './pages/courses-edit';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './auth.guard';

const SECURE_ROUTES: Routes = [
  { path: 'perfil',
    component: ProfileComponent
  },
  { path: 'home',
    component: DefaultComponent,
    data: { name: 'Gestão Gcriva' }
  },
  { path: 'usuarios',
    component: UsersComponent,
    data: { name: 'Usuários', role: 'admin' }
  },
  { path: 'beneficiarios',
    component: BeneficiariesComponent,
    data: { name: 'Beneficiarios' }
  },
  { path: 'beneficiarios/new',
    component: EditBeneficiariesComponent,
    data: { name: 'Edição de Beneficiarios' }
  },
  { path: 'beneficiarios/:id',
    component: EditBeneficiariesComponent,
    data: { name: 'Edição de Beneficiarios' }
  },
  { path: 'about',
    component: AboutComponent
  },
  { path: 'detail',
    loadChildren: './+detail#DetailModule'
  },
  { path: 'barrel',
    loadChildren: './+barrel#BarrelModule'
  },
  {
    path: 'usuarios/novo',
    component: NewUserComponent,
    data: { name: 'Novo usuário', role: 'admin' }
  },
  {
    path: 'projetos',
    component: ProjectsComponent,
    data: { name: 'Projetos' }
  },
  {
    path: 'projetos/new',
    component: EditProjectsComponent,
    data: { name: 'Criar novo Projeto' }
  },
  {
    path: 'projetos/:id',
    component: EditProjectsComponent,
    data: { name: 'Editar projeto' }
  },
  {
    path: 'cursos',
    component: CoursesComponent,
    data: { name: 'Cursos' }
  },
  {
    path: 'cursos/new',
    component: EditCoursesComponent,
    data: { name: 'Edição de Cursos' }
  },
  {
    path: 'cursos/:id',
    component: EditCoursesComponent,
    data: { name: 'Edição de Cursos' }
  }
];

export const ROUTES: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', component: MenuComponent, canActivate: [AuthGuard], children: SECURE_ROUTES },
  { path: '**',  redirectTo: '', pathMatch: 'full' },
];
