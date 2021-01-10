import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioModule } from './usuario/usuario.module';
import { HomeComponent } from './home/home.component';
import { EscolaComponent } from './escola/escola.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';
import { AlunoComponent } from './aluno/aluno.component';
import { TurmaComponent } from './turma/turma.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { MidiaComponent } from './midia/midia.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { ResponderAtividadeComponent } from './responder-atividade/responder-atividade.component';

@NgModule({
  declarations: [
    HomeComponent,
    EscolaComponent,
    ProfessorComponent,
    AlunoComponent,
    TurmaComponent,
    DisciplinaComponent,
    AtividadeComponent,
    MidiaComponent,
    PerguntaComponent,
    ResponderAtividadeComponent],
  imports: [
    CommonModule,
    UsuarioModule,
    TableModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    UsuarioModule
  ]
})
export class PagesModule { }
