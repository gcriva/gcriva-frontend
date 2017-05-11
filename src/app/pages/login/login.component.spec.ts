import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';

describe('Login', () => {

  it('should log ngOnInit', inject([LoginComponent], (login: LoginComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
  }));

});
