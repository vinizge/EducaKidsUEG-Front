import { TurmaService } from './../../services/turma.service';
import { ProfessorService } from './../../services/professor.service';
import { NgForm } from '@angular/forms';
import { AtividadeService } from '../../services/atividade.service';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { PerguntaService } from 'src/app/services/pergunta.service';
import { MidiaService } from 'src/app/services/midia.service';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit {

  public submitted: boolean = false;;
  public atividade: any;
  public alterarAtividadeLabel = "Alterar";
  public cadastrarAtividade = "Adicionar";
  public cols: any[];
  public atividades: any[];
  public professor: { nome: '' };
  public perguntas: any[];
  public midias: any[];
  public turmas: any[];

  constructor(
    public route: ActivatedRoute,
    public atividadeService: AtividadeService,
    public professorService: ProfessorService,
    public loginService: LoginService,
    public perguntaService: PerguntaService,
    public midiaService: MidiaService,
    public turmaService: TurmaService
  ) { }

  ngOnInit(): void {
    this.professor = this.route.snapshot.data["professor"];
    this.inicializaPerguntas();
    this.inicializaMidias();
    this.inicializarAtividade();
    this.inicializaTurmas();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
    ];
    this.atualizarListaAtividades();
  }

  public inicializarAtividade() {
    let professor = {};
    if (this.professor && this.professor["role"] == "professor") {
      professor = this.professor;
    }
    this.atividade = {
      nome: '',
      ProfessorId: professor["id"],
      midiaAtividade: [],
      perguntaAtividade: [],
      turma: ''
    }
  }

  public inicializaPerguntas() {
    this.perguntaService.getPerguntas().subscribe(data => {
      if (data) {
        this.perguntas = data;
      }
    });
  }

  public inicializaMidias() {
    this.midiaService.getMidias().subscribe(data => {
      if (data) {
        this.midias = data;
      }
    })
  }

  public inicializaTurmas() {
    this.turmaService.getTurmas().subscribe(data => {
      if (data) {
        this.turmas = data;
      }
    })
  }

  public addItem(item, adiciona) {
    if (adiciona) {
      if (item.pergunta) {
        this.atividade.perguntaAtividade.push(item);
      } else if (item.nome) {
        this.atividade.midiaAtividade.push(item);
      }
    } else {
      if (item.pergunta) {
        this.atividade.perguntaAtividade = this.atividade.perguntaAtividade.filter(pergunta => {
          if (pergunta.id != item.id) {
            return pergunta;
          }
        });
      } else if (item.nome) {
        this.atividade.midiaAtividade = this.atividade.midiaAtividade.filter(midia => {
          if (midia.id != item.id) {
            return midia;
          }
        });
      }
    }
  }

  public atualizarListaAtividades() {
    this.atividadeService.getAtividades().subscribe(data => {
      this.atividades = data.sort(this.compare);
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

  public salvarAtividade(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.atividade.ProfessorId && this.atividade.turma) {
      let array = [];
      this.atividade.perguntaAtividade.forEach(pergunta => {
        array.push(parseInt(pergunta.id));
      });
      this.atividade.perguntaAtividade = array;
      array = [];
      this.atividade.midiaAtividade.forEach(midia => {
        array.push(parseInt(midia.id));
      });
      this.atividade.midiaAtividade = array;
      this.atividade.TurmaId = this.atividade.turma;
      this.atividadeService.salvarAtividade(this.atividade).subscribe(data => {
        if (data) {
          console.log(`A atividade ${data.nome} foi inserida com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarAtividade();
        this.atualizarListaAtividades();
      });
    }
  }

  public alterarAtividade(atividadeId: any, form) {
    let atividade = {
      id: atividadeId
    };
    this.atividadeService.getAtividade(atividade).subscribe(data => {
      if (data) {
        this.atividade.id = data.id;
        this.atividade.nome = data.nome;
        this.atividade.perguntaAtividade = data.Pergunta;
        this.atividade.midiaAtividade = data.Midia;
        this.atividade.turma = data.Turmas[0]["id"];
        console.log(this.atividade.turma);
        this.verificaMidia();
        this.verificaPergunta();
      } else {
        console.log("Atividade não encontrado");
      }
    });
  }

  public verificaMidia() {
    this.midias.forEach(midia => {
      let busca = this.atividade.midiaAtividade.find(item => item.id == midia.id)
      if (busca) {
        midia.check = true;
      }
    });
  }

  public verificaPergunta() {
    this.perguntas.forEach(pergunta => {
      let busca = this.atividade.perguntaAtividade.find(item => item.id == pergunta.id)
      if (busca) {
        pergunta.check = true;
      }
    });
  }

  public excluirAtividade(atividadeId: any) {
    let atividade = {
      id: atividadeId
    };
    this.atividadeService.excluirAtividade(atividade).subscribe(data => {
      this.resetarAtividade();
      this.atualizarListaAtividades();
    })
  }

  public resetarAtividade() {
    this.atividade.id = '';
    this.atividade.nome = '';
    this.atividade.turma = {}
    this.midias.forEach(midia => {
      midia.check = false;
    });
    this.perguntas.forEach(pergunta => {
      pergunta.check = false;
    });
  }
}


