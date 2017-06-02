import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AuthModule } from './auth.module';
import { ApiHttpModule } from './api-http.module';
import { AuthGuard } from './auth.guard';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './pages/home/x-large';
import { CustomDirectivesModule } from './directives';

// material
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule,
  MdCheckboxModule,
  MdGridListModule,
  MdInputModule,
  MdSnackBarModule,
  MdSidenavModule,
  MdIconModule,
  MdToolbarModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdCardModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdButtonToggleModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
} from '@angular/material';

// pages
import { HomeComponent } from './pages/home';
import { AboutComponent } from './pages/about';
import { LoginComponent } from './pages/login';
import { ResetPasswordComponent } from './pages/reset-password';
import { ForgotComponent } from './pages/forgot';
import { MenuComponent } from './pages/menu';
import { DefaultComponent } from './pages/default';
import { ProfileComponent } from './pages/profile';
import { UsersComponent, NewUserComponent } from './pages/users';
import { BeneficiariesComponent } from './pages/beneficiaries';
import { DialogDeleteComponent } from './pages/beneficiaries/dialog.delete';
import { EditBeneficiariesComponent } from './pages/beneficiaries-edit';
import { ProjectsComponent } from './pages/projects';
import { EditProjectsComponent } from './pages/projects-edit';
import { CoursesComponent } from './pages/courses';
import { EditCoursesComponent } from './pages/courses-edit';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthGuard
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    LoginComponent,
    ResetPasswordComponent,
    MenuComponent,
    ForgotComponent,
    DefaultComponent,
    ProfileComponent,
    UsersComponent,
    BeneficiariesComponent,
    DialogDeleteComponent,
    EditBeneficiariesComponent,
    NewUserComponent,
    ProjectsComponent,
    EditProjectsComponent,
    CoursesComponent,
    EditCoursesComponent
  ],
  entryComponents: [DialogDeleteComponent],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdGridListModule,
    MdInputModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdCardModule,
    MdButtonToggleModule,
    MdNativeDateModule,
    MdDatepickerModule,
    ApiHttpModule,
    AuthModule,
    CustomDirectivesModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdSelectModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
