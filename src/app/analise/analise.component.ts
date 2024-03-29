import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnaliseService } from '../analise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-analise',
    templateUrl: './analise.component.html',
    styleUrls: ['./analise.component.css']
})
export class AnaliseComponent implements OnInit {
    displayedColumns: string[] = ['descricao', 'valor'];
    dataSource: any = [];

    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: [
            // '2006', '2007', '2008', '2009', '2010', '2011', '2012'
        ],
        datasets: [
            // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ]
    };

    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
    };

    total_trial: number = 0
    quantidade_ativos: number = 0
    quantidade_cancelados: number = 0
    total_atrasados: number = 0

    constructor(private analiseService: AnaliseService, private rotaAtiva: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        let id = this.rotaAtiva.snapshot.paramMap.get('id');

        this.analiseService.analise(id).subscribe({
            next: (resultado: any) => {
                console.log(resultado)
                this.montaGrafico(resultado.grafico)
                this.total_trial = resultado.total_trial
                this.quantidade_ativos = resultado.quantidade_ativos
                this.quantidade_cancelados = resultado.quantidade_cancelados
                this.total_atrasados = resultado.total_atrasados

                this.montaTabela(resultado)

            }
        })
    }

    montaGrafico(grafico: any) {
        this.barChartData = {
            labels: grafico.map((gra: any) => gra.mes),
            datasets: [
                { data: grafico.map((gra: any) => gra.cancelados), label: 'Número de cancelados', backgroundColor: '#693BB8' },
                { data: grafico.map((gra: any) => gra.novos), label: 'Clientes novos', backgroundColor: '#3BB853' },
                { data: grafico.map((gra: any) => gra.percentual), label: 'Churn Rate', backgroundColor: '#B83B4D' },

            ]
        };
    }

    montaTabela(resultado: any) {
        this.dataSource = [
            { descricao: 'Cliente mais antigo, ainda ativo', valor: resultado.antigo_ativo },
            { descricao: 'Mês com mais cancelamentos', valor: resultado.mes_mais_cancelado.mes },
            { descricao: 'Mês com menos cancelamentos', valor: resultado.mes_menos_cancelado.mes },
            { descricao: 'Total de clientes ativos', valor: resultado.quantidade_ativos },
            { descricao: 'Total de clientes cancelados', valor: resultado.quantidade_cancelados },

        ]
    }

}
