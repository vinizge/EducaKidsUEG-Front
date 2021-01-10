import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) { }

  public salvarPergunta(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escolas/save`, escola);
  }

  public getPergunta(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escolas/get`, escola);
  }

  public getPerguntas(): Observable<any> {
    return this.http.get(`http://localhost:3000/escolas/getAll`);
  }

  public excluirPergunta(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escolas/delete`, escola);
  }
}
