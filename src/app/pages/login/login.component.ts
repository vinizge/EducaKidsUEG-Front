import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitted: boolean = false;;
  public login: any;
  public loginLabel = "Logar";

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.inicializarLogin();
  }

  public inicializarLogin() {
    this.login = {
      email: '',
      senha: ''
    }
  }

  public logar(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.login.email && this.login.senha) {
      this.loginService.login(this.login).subscribe(data => {
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          window.location.replace('/home')
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarLogin();
      });
    }
  }

  public resetarLogin() {
    this.login = {};
  }
}


