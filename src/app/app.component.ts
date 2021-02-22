import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EducaKids';

  public role;

  ngOnInit() {
    this.role = localStorage.getItem("role");
  }
}
