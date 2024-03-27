import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcluirComponent } from '../excluir/excluir.component';
import { Anexo, AnexoService } from '../anexo.service';


@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.component.html',
  styleUrls: ['./anexo.component.css']
})
export class AnexoComponent implements OnInit {

  anexos: Anexo[] = []

  constructor(private dialog: MatDialog, private rota: Router, private anexoService: AnexoService) { }

  ngOnInit(): void {
    this.listaAnexo()
  }

  navegaAnalise() {
    this.rota.navigate(['analise'])
  }

  excluir() {
    this.dialog.open(ExcluirComponent);
  }

  adicionaArquivo(evento: any) {
    for (let element of evento.target.files) {
      let file: File = element;
      let formData: FormData = new FormData();
      formData.append('nome', file.name)
      formData.append('arquivo', file)

      this.anexoService.subirAnexo(formData).subscribe({
        next: (retornoDoBack: any) => {
          this.listaAnexo()
        }
      })
    }
  }

  listaAnexo() {
    this.anexoService.listarAnexo().subscribe({
      next: (resultadoDoBack: Anexo[]) => {
        this.anexos = resultadoDoBack
      }
    })
  }

}

