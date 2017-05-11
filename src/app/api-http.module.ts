import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  Http,
  Request,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs
} from '@angular/http';
import { ApiHttp } from './api-http.service';

export function apiHttpServiceFactory(backend: ConnectionBackend, defaultOptions: RequestOptions) {
  // TODO: fix this, we're getting an Http instance instead of a ConnectionBackend one
  return new ApiHttp((<any> backend)._backend, defaultOptions);
}

@NgModule({
  providers: [
    {
      provide: ApiHttp,
      useFactory: apiHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class ApiHttpModule {}
