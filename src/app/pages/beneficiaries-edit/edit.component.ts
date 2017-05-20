import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import {FormControl} from '@angular/forms';

import * as jsonBrasil from '../../json/cities.json'

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
	selector: 'beneficiaries-edit',
	styleUrls: ['./edit-components.scss'],
	templateUrl: './edit.components.html'
})
export class EditBeneficiariesComponent {
	public editObjt: any = {};
	public stateCtrl: FormControl;
	public filteredStates: any;
	public states: any[] = [];
	constructor(
		public http: AuthHttp,
		public snackBar: MdSnackBar,
		private appState: AppState
	) {
		this.stateCtrl = new FormControl();
		this.states = jsonBrasil.estados;
		this.filteredStates = this.stateCtrl.valueChanges
			.startWith(null)
			.map(name => this.filterStates(name));
	}

	public save() {
		console.log('save');
	}

	public filterStates(val: string) {
		return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s)) : this.states;
	}
}
