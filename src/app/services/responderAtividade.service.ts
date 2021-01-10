import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResponderAtividadeService {

  constructor(private http: HttpClient) { }

  public salvarResponderAtividade(responderAtividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/responderAtividades/save`, responderAtividade);
  }

  public getResponderAtividade(responderAtividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/responderAtividades/get`, responderAtividade);
  }

  public getResponderAtividades(): Observable<any> {
    return this.http.get(`http://localhost:3000/responderAtividades/getAll`);
  }

  public excluirResponderAtividade(responderAtividade: any): Observable<any> {
    return this.http.post(`http://localhost:3000/responderAtividades/delete`, responderAtividade);
  }
}
