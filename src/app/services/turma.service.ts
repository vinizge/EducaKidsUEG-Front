import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private http: HttpClient) { }

  public salvarTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/save`, turma);
  }

  public getTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/get`, turma);
  }

  public getTurmas(): Observable<any> {
    return this.http.get(`http://localhost:3000/turmas/getAll`);
  }

  public excluirTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/delete`, turma);
  }
}
