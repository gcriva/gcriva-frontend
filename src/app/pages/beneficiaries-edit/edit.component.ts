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
	public states: any[] = [];
	public cities: any[] = [];
	public filteredCities: any;
	public citieCtrl: FormControl;
	constructor(
		public http: AuthHttp,
		public snackBar: MdSnackBar,
		private appState: AppState,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.states = jsonBrasil.estados;

		this.route.params.subscribe((params) => {
			if(params.id) {
				this.http.get(`/beneficiaries/${params.id}`)
				.map((res) => res.json())
				.subscribe(
					(data) => {
						this.editObjt = data.beneficiary;
						this.citieCtrl.setValue(this.editObjt.city);
						this.filterStates();
					},
					handleErrorResponse(this.snackBar)
				);
			}
		});

		this.citieCtrl = new FormControl();
		this.filteredCities = this.citieCtrl.valueChanges
			.startWith(null)
			.map(name => this.filter(name))
			.debounceTime(200);
	}

	public save() {
		this.editObjt.city = this.citieCtrl.value;
		if (this.editObjt.id) {
			this.http.put('/beneficiaries/' + this.editObjt.id, { beneficiary: this.editObjt })
				.subscribe((data) => {
						this.router.navigate(['beneficiarios']);
					},
					handleErrorResponse(this.snackBar)
				);
		} else {
			this.http.post('/beneficiaries', { beneficiary: this.editObjt})
				.subscribe((data) => {
						this.router.navigate(['beneficiarios']);
					},
					handleErrorResponse(this.snackBar)
				);
		}
	}

	public filterStates() {
		let filteredStates = this.states.filter( (state) => {
			return state.nome == this.editObjt.state;
		});
		if(filteredStates.length > 0) {
			this.cities = filteredStates[0].cidades;
		}
	}

	public filter(val: string) {
		return val ? this.cities.filter(s => new RegExp(`^${val}`, 'gi').test(s))
					: this.cities;
	}
}
