import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';

@Component({
  selector: 'projects',
  styleUrls: ['./projects-components.scss'],
  templateUrl: './projects.components.html'
})
export class ProjectsComponent implements OnInit {
  public currentProject: any = {};
  public projectToDelete: string = null;

  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState
  ) {}

  public ngOnInit() {
    this.http.get('/projects')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('projects', data.projects);
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public delete(projectId) {
    this.http.delete(`/projects/${projectId}`)
      .map((res) => res.json())
      .subscribe((data) => {
        this.openSnackBar('Projeto excluído com sucesso');
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openDeleteDialog(projectId: string) {
    this.projectToDelete = projectId;
  }

  public dismissDeleteConfirm() {
    this.projectToDelete = null;
  }
}
