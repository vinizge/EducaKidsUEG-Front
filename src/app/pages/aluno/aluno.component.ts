import { LoginService } from './../../services/login.service';
import { ProfessorService } from './../../services/professor.service';
import { TurmaService } from './../../services/turma.service';
import { EscolaService } from './../../services/escola.service';
import { NgForm } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  public submitted: boolean = false;;
  public aluno: any;
  public alterarAlunoLabel = "Alterar";
  public cadastrarAluno = "Adicionar";
  public cols: any[];
  public alunos: any[];
  public escola: any[];
  public turmas: any[];

  constructor(
    public alunoService: AlunoService,
    public escolaService: EscolaService,
    public turmaService: TurmaService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.inicializarAluno();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'email', header: 'Email' },
      { field: 'senha', header: 'Senha' },
      { field: 'escola', header: 'Escola' },
    ];
    this.atualizarListaAlunos();
    this.getEscola();
    this.getTurmas();
  }

  public inicializarAluno() {
    this.aluno = {
      nome: '',
      email: '',
      senha: '',
      EscolaId: '',
      turma: ''
    }
  }

  public atualizarListaAlunos() {
    this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data.sort(this.compare);
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

  public getEscola() {
    this.escolaService.getEscolaByProfessor().subscribe(data => {
      this.escola = data.nome;
      this.aluno.EscolaId = data.id;
    });
  }

  public getTurmas() {
    this.turmaService.getTurmasByProfessor().subscribe(data => {
      this.turmas = data;
    });
  }

  public salvarAluno(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.aluno.EscolaId) {
      this.alunoService.salvarAluno(this.aluno).subscribe(data => {
        if (data) {
          console.log(`O aluno ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarAluno();
        this.atualizarListaAlunos();
      });
    }
  }

  public alterarAluno(alunoId: any) {
    let aluno = {
      id: alunoId
    };
    this.alunoService.getAluno(aluno).subscribe(data => {
      if (data) {
        this.aluno.id = data.id;
        this.aluno.nome = data.nome;
        this.aluno.email = data.email;
        this.aluno.senha = "";
        this.aluno.EscolaId = data.EscolaId;
        this.aluno.turma = data.Turmas[0].id;
      } else {
        console.log("Aluno não encontrado");
      }
    });
  }

  public excluirAluno(alunoId: any) {
    let aluno = {
      id: alunoId
    };
    this.alunoService.excluirAluno(aluno).subscribe(data => {
      this.resetarAluno();
      this.atualizarListaAlunos();
    })
  }

  public resetarAluno() {
    this.aluno.nome = '';
    this.aluno.email = '';
    this.aluno.senha = '';
    this.aluno.turma = '';
  }
}



