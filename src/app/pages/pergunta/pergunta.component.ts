import { DisciplinaService } from './../../services/disciplina.service';
import { ProfessorService } from './../../services/professor.service';
import { EscolaService } from './../../services/escola.service';
import { NgForm } from '@angular/forms';
import { PerguntaService } from '../../services/pergunta.service';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {

  public submitted: boolean = false;;
  public pergunta: any;
  public alterarPerguntaLabel = "Alterar";
  public cadastrarPergunta = "Adicionar";
  public cols: any[];
  public perguntas: any[];
  public professores: any[];
  public selectOptions: any[];
  public professor: { nome: '' };
  public opcoes = ["a", "b", "c", "d"];

  constructor(
    public route: ActivatedRoute,
    public perguntaService: PerguntaService,
    public professorService: ProfessorService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.professor = this.route.snapshot.data["professor"];
    this.inicializarPergunta();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'pergunta', header: 'Pergunta' },
      { field: 'objetiva', header: 'Objetiva' },
    ];
    this.atualizarListaPerguntas();
  }

  public setarObjetiva(event) {
    this.pergunta.objetiva = event.value.objetivaSwitch;
    if (!this.pergunta.objetiva) {
      this.pergunta.opcao1 = '';
      this.pergunta.opcao2 = '';
      this.pergunta.opcao3 = '';
      this.pergunta.opcao4 = '';
      this.pergunta.gabarito = '';
    }
  }

  public inicializarPergunta() {
    this.pergunta = {
      pergunta: '',
      objetiva: false,
      opcao1: '',
      opcao2: '',
      opcao3: '',
      opcao4: '',
      gabarito: '',
      pontuacao: '',
    }
  }

  public inicializaProfessor() {
    this.loginService.getMe().subscribe(data => {
      if (data.data && data.data.role == "professor") {
        this.professor = data.data;
      }
    });
  }

  public atualizarListaPerguntas() {
    this.perguntaService.getPerguntas().subscribe(data => {
      this.perguntas = data.sort(this.compare);
    });
  }

  public compare(a, b) {
    if ((a.pergunta).toLowerCase() < (b.pergunta).toLowerCase()) {
      return -1;
    }
    if ((a.pergunta).toLowerCase() > (b.pergunta).toLowerCase()) {
      return 1;
    }
    return 0;
  }

  public salvarPergunta(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      if (this.pergunta.pontuacao) {
        this.pergunta.pontuacao = parseFloat(this.pergunta.pontuacao);
      }
      this.perguntaService.salvarPergunta(this.pergunta).subscribe(data => {
        if (data) {
          console.log(`A pergunta ${data.pergunta} foi inserida com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarPergunta();
        this.atualizarListaPerguntas();
      });
    }
  }

  public alterarPergunta(perguntaId: any, form) {
    let pergunta = {
      id: perguntaId
    };
    this.perguntaService.getPergunta(pergunta).subscribe(data => {
      if (data) {
        this.pergunta.objetiva = data.objetiva;
        if (data.objetiva) {
          form.value.objetivaSwitch = true;
        } else {
          form.value.objetivaSwitch = false;
        }
        this.pergunta.id = data.id;
        this.pergunta.pergunta = data.pergunta;
        this.pergunta.opcao1 = data.opcao1;
        this.pergunta.opcao2 = data.opcao2;
        this.pergunta.opcao3 = data.opcao3;
        this.pergunta.opcao4 = data.opcao4;
        this.pergunta.gabarito = data.gabarito;
        this.pergunta.pontuacao = data.pontuacao;
        this.pergunta.professor = data.Professor.nome;
      } else {
        console.log("Pergunta não encontrado");
      }
    });
  }

  public excluirPergunta(perguntaId: any) {
    let pergunta = {
      id: perguntaId
    };
    this.perguntaService.excluirPergunta(pergunta).subscribe(data => {
      this.resetarPergunta();
      this.atualizarListaPerguntas();
    })
  }

  public resetarPergunta() {
    this.pergunta = {};
  }
}


