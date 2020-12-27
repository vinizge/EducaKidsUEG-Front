import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  public salvarProfessor(professor: any): Observable<any> {
    return this.http.post(`http://localhost:3000/professores/save`, professor);
  }

  public getProfessor(professor: any): Observable<any> {
    return this.http.post(`http://localhost:3000/professores/get`, professor);
  }

  public getProfessores(): Observable<any> {
    return this.http.get(`http://localhost:3000/professores/getAll`);
  }

  public excluirProfessor(professor: any): Observable<any> {
    return this.http.post(`http://localhost:3000/professores/delete`, professor);
  }
}
