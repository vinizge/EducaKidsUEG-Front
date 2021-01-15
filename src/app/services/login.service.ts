import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(login: any): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, login);
  }

  public getMe(): Observable<any> {
    return this.http.get(`http://localhost:3000/login/getMe`);
  }
}
