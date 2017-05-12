import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  Http,
  Request,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs
} from '@angular/http';

@Injectable()
export class ApiHttp extends Http {
  private baseUrl: string;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);

    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://gcriva.herokuapp.com'
      : process.env.API_URL || 'http://localhost:4000';
  }

  public request(url: string | Request, options?: RequestOptionsArgs) {
    let finalUrl = url;

    if (typeof url === 'string') {
      finalUrl = this.baseUrl + url;
    } else {
      (<Request> finalUrl).url = this.baseUrl + url.url;
    }

    return super.request(finalUrl, options);
  }
}
