import { Component } from '@angular/core';
import { ExcluirComponent } from './excluir/excluir.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  title = 'rotatividade-mensal';

  constructor(private dialog: MatDialog) { }

  excluir() {
    this.dialog.open(ExcluirComponent);
  }
}

