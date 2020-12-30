import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  public salvarAluno(aluno: any): Observable<any> {
    return this.http.post(`http://localhost:3000/alunos/save`, aluno);
  }

  public getAluno(aluno: any): Observable<any> {
    return this.http.post(`http://localhost:3000/alunos/get`, aluno);
  }

  public getAlunos(): Observable<any> {
    return this.http.get(`http://localhost:3000/alunos/getAll`);
  }

  public excluirAluno(aluno: any): Observable<any> {
    return this.http.post(`http://localhost:3000/alunos/delete`, aluno);
  }
}
