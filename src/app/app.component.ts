import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EducaKids';

  public role;
  public token;

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.token = localStorage.getItem("token");
  }

  public deslogar() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.replace('/logins')
  }
}
