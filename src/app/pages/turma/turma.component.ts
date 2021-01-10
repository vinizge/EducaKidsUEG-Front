import { ProfessorService } from './../../services/professor.service';
import { EscolaService } from './../../services/escola.service';
import { NgForm } from '@angular/forms';
import { TurmaService } from '../../services/turma.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  public submitted: boolean = false;;
  public turma: any;
  public alterarTurmaLabel = "Alterar";
  public cadastrarTurma = "Adicionar";
  public cols: any[];
  public turmas: any[];
  public escolas: any[];
  public professores: any[];

  constructor(
    public turmaService: TurmaService,
    public escolaService: EscolaService,
    public professorService: ProfessorService
  ) { }

  ngOnInit(): void {
    this.inicializarTurma();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'professor', header: 'Professor' },
      { field: 'escola', header: 'Escola' },
    ];
    this.atualizarListaTurmas();
    this.getEscolas();
    this.getProfessores();
  }

  public inicializarTurma() {
    this.turma = {
      nome: '',
      ProfessorId: '',
      EscolaId: ''
    }
  }

  public atualizarListaTurmas() {
    this.turmaService.getTurmas().subscribe(data => {
      this.turmas = data.sort(this.compare);
    });
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

  public getEscolas() {
    this.escolaService.getEscolas().subscribe(data => {
      this.escolas = data;
    });
  }

  public getProfessores() {
    this.professorService.getProfessores().subscribe(data => {
      this.professores = data;
    });
  }

  public salvarTurma(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.turma.EscolaId && this.turma.ProfessorId) {
      this.turma.EscolaId = parseInt(this.turma.EscolaId);
      this.turma.ProfessorId = parseInt(this.turma.ProfessorId);
      this.turmaService.salvarTurma(this.turma).subscribe(data => {
        if (data) {
          console.log(`O turma ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarTurma();
        this.atualizarListaTurmas();
      });
    }
  }

  public alterarTurma(turmaId: any) {
    let turma = {
      id: turmaId
    };
    this.turmaService.getTurma(turma).subscribe(data => {
      if (data) {
        this.turma.id = data.id;
        this.turma.nome = data.nome;
        this.turma.ProfessorId = data.ProfessorId;
        this.turma.EscolaId = data.EscolaId;
      } else {
        console.log("Turma não encontrado");
      }
    });
  }

  public excluirTurma(turmaId: any) {
    let turma = {
      id: turmaId
    };
    this.turmaService.excluirTurma(turma).subscribe(data => {
      this.resetarTurma();
      this.atualizarListaTurmas();
    })
  }

  public resetarTurma() {
    this.turma = {};
  }
}


