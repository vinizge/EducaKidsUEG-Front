import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public submitted: boolean = false;;
  public usuario: any;
  public alterarUser = "Alterar";
  public cadastrarUser = "Adicionar";
  public cols: any[];
  public users: any[];

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.inicializarUsuario();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'email', header: 'Email' },
    ];
    this.atualizarListaUsuarios();
  }

  public inicializarUsuario() {
    this.usuario = {
      nome: '',
      senha: '',
      email: '',

    }
  }

  public atualizarListaUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.users = data;
    });
  }

  public salvarUsuario(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.usuarioService.salvarUsuario(this.usuario).subscribe(data => {
        if (data) {
          console.log(`O usuário ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarUsuario();
        this.atualizarListaUsuarios();
      });
    }
  }

  public alterarUsuario(userId: any) {
    let usuario = {
      id: userId
    };
    this.usuarioService.getUsuario(usuario).subscribe(data => {
      if (data) {
        this.usuario.id = data.id;
        this.usuario.nome = data.nome;
        this.usuario.email = data.email;
      } else {
        console.log("Usuário não encontrado");
      }
    });
  }

  public excluirUsuario(userId: any) {
    let usuario = {
      id: userId
    };
    this.usuarioService.excluirUsuario(usuario).subscribe(data => {
      console.log(data);
      this.resetarUsuario();
      this.atualizarListaUsuarios();
    })
  }

  public resetarUsuario() {
    this.usuario = {};
  }
}

