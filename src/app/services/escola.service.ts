import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  constructor(private http: HttpClient) { }

  public salvarEscola(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escola/save`, escola);
  }

  public getEscola(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escola/get`, escola);
  }

  public getEscolas(): Observable<any> {
    return this.http.get(`http://localhost:3000/escola/getAll`);
  }

  public excluirEscola(escola: any): Observable<any> {
    return this.http.post(`http://localhost:3000/escola/delete`, escola);
  }
}
