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

@Injectable()
export class ApiHttp extends Http {
  private baseUrl: string;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private appState: AppState
  ) {
    super(backend, defaultOptions);

    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://gestaogcriva.azurewebsites.net/'
      : process.env.API_URL || 'http://localhost:4000';
  }

  public request(url: string | Request, options?: RequestOptionsArgs) {
    let finalUrl = url;

    if (typeof url === 'string') {
      finalUrl = this.baseUrl + url;
    } else {
      (<Request> finalUrl).url = this.baseUrl + url.url;
    }

    let isDone = false;

    // If the request returns very fast, don't show the progress bar
    setTimeout(() => {
      if (!isDone) {
        this.startLoading();
      }
    }
    , 250);

    return super.request(finalUrl, options).finally(() => {
      isDone = true;
      this.finishLoading();
    });
  }

  public startLoading() {
    this.appState.set('isLoading', true);
  }

  public finishLoading() {
    this.appState.set('isLoading', false);
  }
}
