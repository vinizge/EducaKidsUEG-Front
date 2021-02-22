import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  public token = localStorage.getItem("token");
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) {
  }

  public salvarTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/save`, turma);
  }

  public getTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/get`, turma);
  }

  public getTurmasByProfessor(): Observable<any> {
    return this.http.get(`http://localhost:3000/turmas/getAllByProfessor`);
  }

  public getTurmas(): Observable<any> {
    return this.http.get(`http://localhost:3000/turmas/getAll`, this.httpOptions);
  }

  public excluirTurma(turma: any): Observable<any> {
    return this.http.post(`http://localhost:3000/turmas/delete`, turma);
  }
}
