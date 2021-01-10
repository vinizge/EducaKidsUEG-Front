import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MidiaService {

  constructor(private http: HttpClient) { }

  public salvarMidia(midia: any): Observable<any> {
    return this.http.post(`http://localhost:3000/midias/save`, midia);
  }

  public getMidia(midia: any): Observable<any> {
    return this.http.post(`http://localhost:3000/midias/get`, midia);
  }

  public getMidias(): Observable<any> {
    return this.http.get(`http://localhost:3000/midias/getAll`);
  }

  public excluirMidia(midia: any): Observable<any> {
    return this.http.post(`http://localhost:3000/midias/delete`, midia);
  }
}
