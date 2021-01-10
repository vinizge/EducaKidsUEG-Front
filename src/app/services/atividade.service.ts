import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) { }

  public salvarAtividade(atividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/atividades/save`, atividade);
  }

  public getAtividade(atividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/atividades/get`, atividade);
  }

  public getAtividades(): Observable<any> {
    return this.http.get(`http://localhost:3000/atividades/getAll`);
  }

  public excluirAtividade(atividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/atividades/delete`, atividade);
  }
}
