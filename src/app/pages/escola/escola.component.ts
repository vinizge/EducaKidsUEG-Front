import { NgForm } from '@angular/forms';
import { EscolaService } from '../../services/escola.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.component.html',
  styleUrls: ['./escola.component.css']
})
export class EscolaComponent implements OnInit {

  public submitted: boolean = false;;
  public escola: any;
  public alterarEscolaLabel = "Alterar";
  public cadastrarEscola = "Adicionar";
  public cols: any[];
  public escolas: any[];

  constructor(
    public usuarioService: EscolaService
  ) { }

  ngOnInit(): void {
    this.inicializarEscola();
    /*     this.cols = [
          { field: 'id', header: 'Id' },
          { field: 'nome', header: 'Nome' },
          { field: 'email', header: 'Email' },
        ];
        this.atualizarListaEscolas(); */
  }

  public inicializarEscola() {
    this.escola = {
      nome: '',
      senha: '',
      email: '',

    }
  }

  public atualizarListaEscolas() {
    this.usuarioService.getEscolas().subscribe(data => {
      this.escolas = data;
    });
  }

  public salvarEscola(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.usuarioService.salvarEscola(this.escola).subscribe(data => {
        if (data) {
          console.log(`A escola ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarEscola();
        this.atualizarListaEscolas();
      });
    }
  }

  public alterarEscola(escolaId: any) {
    let escola = {
      id: escolaId
    };
    this.usuarioService.getEscola(escola).subscribe(data => {
      if (data) {
        this.escola.id = data.id;
        this.escola.nome = data.nome;
        this.escola.email = data.email;
      } else {
        console.log("Escola não encontrado");
      }
    });
  }

  public excluirEscola(escolaId: any) {
    let escola = {
      id: escolaId
    };
    this.usuarioService.excluirEscola(escola).subscribe(data => {
      console.log(data);
      this.resetarEscola();
      this.atualizarListaEscolas();
    })
  }

  public resetarEscola() {
    this.escola = {};
  }
}


