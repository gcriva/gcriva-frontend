import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
		.footer {
			bottom: 30px;
			position: absolute;
			width: 100%;
			text-align:center;
		}

		.botton-footer {
			width: 50%;
		}
  `],
  template: `
    <h1>Sobre a ONG</h1>
    <div>
      .... ..... ....
    </div>
    <footer class="footer">
		  <button class="botton-footer"
           md-raised-button [routerLink]=" ['/home'] "
           type="button">Voltar
      </button>
    </footer>
  `
})
export class AboutComponent {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}
}
