import { LoginService } from './../../services/login.service';
import { NgForm } from '@angular/forms';
import { ResponderAtividadeService } from '../../services/responderAtividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css']
})
export class CorrecaoComponent implements OnInit {

  public submitted: boolean = false;
  public cadastrarResponderAtividade = "Salvar Respostas";
  public cols: any[];
  public atividades: any[];
  public atividade: any;
  public perguntas: any[];
  public midias: any[];
  public respostaAtividade: any[];
  public aluno: any;
  public respostasAtividades: any[];

  constructor(
    public route: ActivatedRoute,
    public responderAtividadeService: ResponderAtividadeService,
    public atividadeService: AtividadeService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.inicializarResponderAtividade();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
    ];
    this.atualizarListaAtividades();
    this.inicializaAluno();
  }

  public inicializarResponderAtividade() {
    this.resetarResponderAtividade();
  }

  public atualizarListaAtividades() {
    this.atividadeService.getAtividades().subscribe(data => {
      this.atividades = data.sort(this.compare);
    });
  }

  public inicializaAluno() {
    this.loginService.getMe().subscribe(data => {
      if (data && data.data && data.data.role == 'aluno') {
        this.aluno = data.data;
      }
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

  public salvarResponderAtividade(form: NgForm) {
    this.submitted = true;
    this.atividade.AlunoId = this.aluno.id
    if (form.valid && this.atividade.AlunoId && this.atividade.AtividadeId) {
      console.log("salvou")
      this.atividade.Pergunta.forEach(pergunta => {
        pergunta.idPergunta = pergunta.id;
        delete pergunta.id;
        pergunta.AlunoId = this.atividade.AlunoId;
        pergunta.AtividadeId = this.atividade.AtividadeId;
      });
      this.atividade.Midia.forEach(midia => {
        midia.idMidia = midia.id;
        delete midia.id;
        midia.AlunoId = this.atividade.AlunoId;
        midia.AtividadeId = this.atividade.AtividadeId;
      });
      this.responderAtividadeService.salvarResponderAtividade(this.atividade).subscribe(data => {
        if (data) {
          console.log(`A responderAtividade foi inserida com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarResponderAtividade();
        this.atualizarListaAtividades();
      });
    }
  }

  public corrigirAtividade(atividadeId: any) {
    let atividade = {
      atividadeId: atividadeId
    }
    this.responderAtividadeService.getAllByAtividade(atividade).subscribe(data => {
      this.respostasAtividades = data;
    }
    );

    this.atividade = this.atividades.find(busca => busca.id == atividadeId);
    this.perguntas = this.atividade['Pergunta'];
    this.perguntas.forEach(pergunta => {
      if (pergunta.objetiva) {
        pergunta.opcoes = [{ opcao: pergunta.opcao1, value: 'a' }, { opcao: pergunta.opcao2, value: 'b' }, { opcao: pergunta.opcao3, value: 'c' }, { opcao: pergunta.opcao4, value: 'd' }]
      }
    })
    this.midias = this.atividade['Midia'];
    this.atividade.AtividadeId = this.atividade.id;
    delete this.atividade.id;
    delete this.atividade.ProfessorId;
    delete this.atividade.createdAt;
    delete this.atividade.updatedAt;
    delete this.atividade.Professor;
  }

  public resetarResponderAtividade() {
    this.respostaAtividade = [];
    this.atividade = {
      AtividadeId: '',
      perguntas: [],
      AlunoId: '',
      midias: []
    }
    this.perguntas = [];
    this.midias = [];
  }
}



