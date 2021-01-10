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
    public escolaService: EscolaService
  ) { }

  ngOnInit(): void {
    this.inicializarEscola();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'endereco', header: 'Endereco' },
      { field: 'telefone', header: 'Telefone' },
    ];
    this.atualizarListaEscolas();
  }

  public inicializarEscola() {
    this.escola = {
      nome: '',
      endereco: '',
      telefone: ''
    }
  }

  public compare(a, b) {
    if ((a.nome).toLowerCase() < (b.nome).toLowerCase()) {
      return -1;
    }
    if ((a.nome).toLowerCase() > (b.nome).toLowerCase()) {
      return 1;
    }
    return 0;
  }

  public atualizarListaEscolas() {
    this.escolaService.getEscolas().subscribe(data => {
      this.escolas = data.sort(this.compare);
    });
  }

  public salvarEscola(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.escolaService.salvarEscola(this.escola).subscribe(data => {
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
    this.escolaService.getEscola(escola).subscribe(data => {
      if (data) {
        this.escola.id = data.id;
        this.escola.nome = data.nome;
        this.escola.endereco = data.endereco;
        this.escola.telefone = data.telefone;
      } else {
        console.log("Escola não encontrada");
      }
    });
  }

  public excluirEscola(escolaId: any) {
    let escola = {
      id: escolaId
    };
    this.escolaService.excluirEscola(escola).subscribe(data => {
      this.resetarEscola();
      this.atualizarListaEscolas();
    })
  }

  public resetarEscola() {
    this.escola = {};
  }
}


