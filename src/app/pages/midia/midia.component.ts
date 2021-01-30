import { ProfessorService } from './../../services/professor.service';
import { NgForm } from '@angular/forms';
import { MidiaService } from '../../services/midia.service';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {

  public submitted: boolean = false;;
  public midia: any;
  public alterarMidiaLabel = "Alterar";
  public cadastrarMidia = "Adicionar";
  public cols: any[];
  public midias: any[];
  public professores: any[];
  public professor: { nome: '' };


  constructor(
    public route: ActivatedRoute,
    public midiaService: MidiaService,
    public professorService: ProfessorService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.professor = this.route.snapshot.data["professor"];
    this.inicializarMidia();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'link', header: 'Link' },
    ];
    this.atualizarListaMidias();
  }

  public inicializarMidia() {
    this.midia = {
      nome: '',
      link: ''
    }
  }

  public inicializaProfessor() {
    this.loginService.getMe().subscribe(data => {
      if (data.data && data.data.role == "professor") {
        this.professor = data.data;
      }
    });
  }

  public atualizarListaMidias() {
    this.midiaService.getMidias().subscribe(data => {
      this.midias = data.sort(this.compare);
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

  public salvarMidia(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.midiaService.salvarMidia(this.midia).subscribe(data => {
        if (data) {
          console.log(`A midia ${data.nome} foi inserida com sucesso!`);
        } else {
          console.log("Não foi possível realizar a operação");
        }
        this.submitted = false;
        this.resetarMidia();
        this.atualizarListaMidias();
      });
    }
  }

  public alterarMidia(midiaId: any) {
    let midia = {
      id: midiaId
    };
    this.midiaService.getMidia(midia).subscribe(data => {
      if (data) {
        this.midia.id = data.id;
        this.midia.nome = data.nome;
        this.midia.link = data.link;
        this.midia.professor = data.Professor.nome;
      } else {
        console.log("Midia não encontrado");
      }
    });
  }

  public excluirMidia(midiaId: any) {
    let midia = {
      id: midiaId
    };
    this.midiaService.excluirMidia(midia).subscribe(data => {
      this.resetarMidia();
      this.atualizarListaMidias();
    })
  }

  public resetarMidia() {
    this.midia = {};
  }
}


