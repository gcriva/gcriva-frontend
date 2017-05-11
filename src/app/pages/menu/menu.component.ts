import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  styleUrls: ['./menu-components.css'],
  templateUrl: './menu.components.html'
})
export class MenuComponent {
  public toProjects() {
    console.log('to projects');
  }

  public toParents() {
    console.log('to parents');
  }

  public tostudents() {
    console.log('to students');
  }
}
