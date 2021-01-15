import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GetMeResolve implements Resolve<any> {

  constructor(private loginService: LoginService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return new Observable(observer => {
      this.loginService.getMe().subscribe(
        data => {
          observer.next(data.data);
          observer.complete();
        }
      );
    });
  }
}
