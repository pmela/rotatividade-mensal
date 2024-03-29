import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcluirComponent } from '../excluir/excluir.component';
import { Anexo, AnexoService } from '../anexo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
    selector: 'app-anexo',
    templateUrl: './anexo.component.html',
    styleUrls: ['./anexo.component.css']
})
export class AnexoComponent implements OnInit {

    anexos: Anexo[] = [];

    filtroNome: FormControl = new FormControl(null, []);

    constructor(
        private dialog: MatDialog,
        private rota: Router,
        private anexoService: AnexoService
    ) { }

    ngOnInit(): void {
        this.listaAnexo();
        this.filtroNome.valueChanges.pipe(
            distinctUntilChanged(),
            debounceTime(800),
        ).subscribe((value) => {
            this.listaAnexo(value);
        });
    }

    navegaAnalise(id: any) {
        this.rota.navigate(['analise', id])
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

    listaAnexo(nome?: string) {
        let parametros = {};
        if (nome) {
            parametros = { nome: nome };
        }
        this.anexoService.listarAnexo(parametros).subscribe({
            next: (resultadoDoBack: Anexo[]) => {
                this.anexos = resultadoDoBack
            }
        })
    }

    excluir(anexo: Anexo) {
        const dialogRef = this.dialog.open(ExcluirComponent);
        dialogRef.afterClosed().subscribe(confirmacao => {
            if (confirmacao) {
                this.excluirAnexo(anexo);
            }
        });
    }

    excluirAnexo(anexo: Anexo) {
        this.anexoService.excluirAnexo(anexo.id).subscribe({
            next: (resultado: any) => {
                this.listaAnexo();
            }
        });
    }

}

