import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) { }

  public salvarPergunta(pergunta: any): Observable<any> {
    return this.http.post(`http://localhost:3000/perguntas/save`, pergunta);
  }

  public getPergunta(pergunta: any): Observable<any> {
    return this.http.post(`http://localhost:3000/perguntas/get`, pergunta);
  }

  public getPerguntas(): Observable<any> {
    return this.http.get(`http://localhost:3000/perguntas/getAll`);
  }

  public excluirPergunta(pergunta: any): Observable<any> {
    return this.http.post(`http://localhost:3000/perguntas/delete`, pergunta);
  }
}
