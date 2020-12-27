import { EscolaService } from './../../services/escola.service';
import { NgForm } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  public submitted: boolean = false;;
  public professor: any;
  public alterarProfessorLabel = "Alterar";
  public cadastrarProfessor = "Adicionar";
  public cols: any[];
  public professores: any[];
  public escolas: any[];

  constructor(
    public professorService: ProfessorService,
    public escolaService: EscolaService
  ) { }

  ngOnInit(): void {
    this.inicializarProfessor();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'email', header: 'Email' },
      { field: 'senha', header: 'Senha' },
      { field: 'escola', header: 'Escola' },
    ];
    this.atualizarListaProfessores();
    this.getEscolas();
  }

  public inicializarProfessor() {
    this.professor = {
      nome: '',
      email: '',
      senha: '',
      EscolaId: ''
    }
  }

  public atualizarListaProfessores() {
    this.professorService.getProfessores().subscribe(data => {
      this.professores = data.sort(this.compare);
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

  public salvarProfessor(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.professor.EscolaId) {
      this.professor.EscolaId = parseInt(this.professor.EscolaId);
      this.professorService.salvarProfessor(this.professor).subscribe(data => {
        if (data) {
          console.log(`O professor ${data.nome} foi inserido com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarProfessor();
        this.atualizarListaProfessores();
      });
    }
  }

  public alterarProfessor(professorId: any) {
    let professor = {
      id: professorId
    };
    this.professorService.getProfessor(professor).subscribe(data => {
      if (data) {
        this.professor.id = data.id;
        this.professor.nome = data.nome;
        this.professor.email = data.email;
        this.professor.senha = "";
        this.professor.EscolaId = data.EscolaId;
      } else {
        console.log("Professor não encontrado");
      }
    });
  }

  public excluirProfessor(professorId: any) {
    let professor = {
      id: professorId
    };
    this.professorService.excluirProfessor(professor).subscribe(data => {
      this.resetarProfessor();
      this.atualizarListaProfessores();
    })
  }

  public resetarProfessor() {
    this.professor = {};
  }
}


