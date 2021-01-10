import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  public salvarDisciplina(disciplina: any): Observable<any> {
    return this.http.post(`http://localhost:3000/disciplinas/save`, disciplina);
  }

  public getDisciplina(disciplina: any): Observable<any> {
    return this.http.post(`http://localhost:3000/disciplinas/get`, disciplina);
  }

  public getDisciplinas(): Observable<any> {
    return this.http.get(`http://localhost:3000/disciplinas/getAll`);
  }

  public excluirDisciplina(disciplina: any): Observable<any> {
    return this.http.post(`http://localhost:3000/disciplinas/delete`, disciplina);
  }
}
