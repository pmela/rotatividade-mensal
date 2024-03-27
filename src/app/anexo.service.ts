import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

export interface Anexo {
  id: number;
  nome: string;
  data: Date;
  arquivo: File;
}

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  constructor(private http: HttpClient) { }

  subirAnexo(anexo: FormData): Observable<FormData> {
    return this.http.post<FormData>(environment.back + '/anexo/', anexo);
  }
  listarAnexo(): Observable<Anexo[]> {
    return this.http.get<Anexo[]>(environment.back + '/anexo/');
  }

}
