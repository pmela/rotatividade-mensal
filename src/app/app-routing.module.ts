import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliseComponent } from './analise/analise.component';
import { AnexoComponent } from './anexo/anexo.component';

const routes: Routes = [
  { path: 'analise', component: AnaliseComponent },
  { path: 'anexo', component: AnexoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
