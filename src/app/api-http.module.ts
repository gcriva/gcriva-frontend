import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { AppState } from './app.service';
import {
  Http,
  Request,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs
} from '@angular/http';
import { ApiHttp } from './api-http.service';

export function apiHttpServiceFactory(
  backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  appState: AppState
) {
  // TODO: fix this, we're getting an Http instance instead of a ConnectionBackend one
  return new ApiHttp((<any> backend)._backend, defaultOptions, appState);
}

@NgModule({
  providers: [
    {
      provide: ApiHttp,
      useFactory: apiHttpServiceFactory,
      deps: [Http, RequestOptions, AppState]
    }
  ]
})
export class ApiHttpModule {}
