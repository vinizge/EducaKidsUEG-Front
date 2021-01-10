import { NgForm } from '@angular/forms';
import { DisciplinaService } from '../../services/disciplina.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  public submitted: boolean = false;;
  public disciplina: any;
  public alterarDisciplinaLabel = "Alterar";
  public cadastrarDisciplina = "Adicionar";
  public cols: any[];
  public disciplinas: any[];

  constructor(
    public disciplinaService: DisciplinaService
  ) { }

  ngOnInit(): void {
    this.inicializarDisciplina();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
    ];
    this.atualizarListaDisciplinas();
  }

  public inicializarDisciplina() {
    this.disciplina = {
      nome: '',
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

  public atualizarListaDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe(data => {
      this.disciplinas = data.sort(this.compare);
    });
  }

  public salvarDisciplina(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.disciplinaService.salvarDisciplina(this.disciplina).subscribe(data => {
        if (data) {
          console.log(`A disciplina ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarDisciplina();
        this.atualizarListaDisciplinas();
      });
    }
  }

  public alterarDisciplina(disciplinaId: any) {
    let disciplina = {
      id: disciplinaId
    };
    this.disciplinaService.getDisciplina(disciplina).subscribe(data => {
      if (data) {
        this.disciplina.id = data.id;
        this.disciplina.nome = data.nome;
      } else {
        console.log("Disciplina não encontrada");
      }
    });
  }

  public excluirDisciplina(disciplinaId: any) {
    let disciplina = {
      id: disciplinaId
    };
    this.disciplinaService.excluirDisciplina(disciplina).subscribe(data => {
      this.resetarDisciplina();
      this.atualizarListaDisciplinas();
    })
  }

  public resetarDisciplina() {
    this.disciplina = {};
  }
}


