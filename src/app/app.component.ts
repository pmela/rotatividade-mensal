import { Component } from '@angular/core';
import { ExcluirComponent } from './excluir/excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { AnaliseComponent } from './analise/analise.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  title = 'rotatividade-mensal';

  constructor() { }
}

