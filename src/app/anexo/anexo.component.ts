import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcluirComponent } from '../excluir/excluir.component';


@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.component.html',
  styleUrls: ['./anexo.component.css']
})
export class AnexoComponent {
  
  constructor(private dialog: MatDialog, private rota: Router) { }
  navegaAnalise() {
    this.rota.navigate(['analise'])
  }
  excluir() {
    this.dialog.open(ExcluirComponent);
  }

}

