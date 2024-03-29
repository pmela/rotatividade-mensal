import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AnaliseService {

  constructor(private http: HttpClient) { }

  analise(id: any): Observable<any> {
    return this.http.post<any>(environment.back + '/analise/', { id: id });
  }


}
