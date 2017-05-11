import { NgModule } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ApiHttp } from './api-http.service';

export function authHttpServiceFactory(http: ApiHttp, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT'
  }), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ApiHttp, RequestOptions]
    }
  ]
})
export class AuthModule {}
