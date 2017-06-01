import { Component } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { Router, ActivatedRoute } from '@angular/router';

import * as jsonBrasil from '../../json/cities.json';

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
		private appState: AppState,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.stateCtrl = new FormControl();
		this.states = jsonBrasil.estados;
		this.filterS();

		this.route.params.subscribe((params) => {
			this.editObjt = this.appState.state.beneficiaries.filter((beneficiarie) => {
				return beneficiarie.id === params['id'];
			})[0];
		});
	}

	public filterS() {
		// this.filteredStates = this.states.filter((state) => { return state.nome.indexOf(this.editObjt.state) > -1 });
	}

	public save() {
		this.http.post('/beneficiaries', this.editObjt)
			.subscribe((data) => {
					this.router.navigate(['beneficiarios']);
				},
				handleErrorResponse(this.snackBar)
			);
	}

	public filterStates(val: string) {
		return val ? this.states.filter((s) => new RegExp(`^${val}`, 'gi').test(s)) : this.states;
	}
}
