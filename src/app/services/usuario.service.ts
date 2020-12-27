import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public salvarUsuario(usuario: any): Observable<any> {
    return this.http.post(`http://localhost:3000/usuarios/save`, usuario);
  }

  public getUsuario(usuario: any): Observable<any> {
    return this.http.post(`http://localhost:3000/usuarios/get`, usuario);
  }

  public getUsuarios(): Observable<any> {
    return this.http.get(`http://localhost:3000/usuarios/getAll`);
  }

  public excluirUsuario(usuario: any): Observable<any> {
    return this.http.post(`http://localhost:3000/usuario/delete`, usuario);
  }
}
