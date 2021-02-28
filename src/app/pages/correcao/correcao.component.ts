import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CorrecaoModalComponent } from './correcao-modal/correcao-modal.component';
import { LoginService } from './../../services/login.service';
import { NgForm } from '@angular/forms';
import { ResponderAtividadeService } from '../../services/responderAtividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import * as _ from 'lodash';

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
  public atividadePorAluno: any[];
  public atividadeNome: any;
  public relatorioModal: BsModalRef;

  constructor(
    public route: ActivatedRoute,
    public responderAtividadeService: ResponderAtividadeService,
    public atividadeService: AtividadeService,
    public loginService: LoginService,
    public modalService: BsModalService
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

  public salvarCorrigirAtividade(form: NgForm) {
    let corrigidas = new Array();
    this.atividadePorAluno.forEach(pergunta => {
      pergunta.forEach(element => {
        corrigidas.push(element);
      });
    });

    let midia = new Array();

    let atividade = {
      AtividadeId: corrigidas[0].AtividadeId,
      AlunoId: corrigidas[0].AlunoId,
      Pergunta: corrigidas,
      Midia: midia,
      id: corrigidas[0].AtividadeId
    }

    this.responderAtividadeService.salvarResponderAtividade(atividade).subscribe(data => {
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

  public corrigirAtividade(atividadeId: any) {
    this.atividadeNome = '';
    this.atividadePorAluno = [];
    let atividade = {
      atividadeId: atividadeId
    }
    this.responderAtividadeService.getAllByAtividade(atividade).subscribe(data => {
      let lista = new Array();
      var grouped = _.mapValues(_.groupBy(data, 'AlunoId'));
      Object.keys(grouped).map(function (key, index) {
        lista.push(grouped[key]);
      });
      if (lista.length) {
        this.atividadePorAluno = lista;
        console.log(this.atividadePorAluno)
        let acharAtividade = this.atividades.find(busca => busca.id == data[0].AtividadeId);
        this.atividadeNome = acharAtividade.nome;
      }
    });
    this.atividade = this.atividades.find(busca => busca.id == atividadeId);
  }

  public abrirRelatorioModal() {
    let atividade = {
      atividadeId: this.atividade.id
    }
    this.responderAtividadeService.getAllByAtividade(atividade).subscribe(data => {
      let lista = new Array();
      var grouped = _.mapValues(_.groupBy(data, 'AlunoId'));
      Object.keys(grouped).map(function (key, index) {
        lista.push(grouped[key]);
      });

      const initialState = {
        lista,
        atividadeNome: this.atividadeNome
      };

      this.relatorioModal = this.modalService.show(CorrecaoModalComponent,
        Object.assign({}, {}, { class: 'modal-lg', initialState }));
    });

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
    this.atividadePorAluno = [];
    this.atividadeNome = '';
  }
}



