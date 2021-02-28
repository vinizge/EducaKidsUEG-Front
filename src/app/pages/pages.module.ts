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
import { AtividadeComponent } from './atividade/atividade.component';
import { MidiaComponent } from './midia/midia.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { ResponderAtividadeComponent } from './responder-atividade/responder-atividade.component';
import { LoginComponent } from './login/login.component';
import { CorrecaoComponent } from './correcao/correcao.component';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CorrecaoModalComponent } from './correcao/correcao-modal/correcao-modal.component'

@NgModule({
  declarations: [
    HomeComponent,
    EscolaComponent,
    ProfessorComponent,
    AlunoComponent,
    TurmaComponent,
    AtividadeComponent,
    MidiaComponent,
    PerguntaComponent,
    ResponderAtividadeComponent,
    LoginComponent,
    CorrecaoComponent,
    CorrecaoModalComponent
  ],
  imports: [
    CommonModule,
    UsuarioModule,
    TableModule,
    FormsModule,
    FlexLayoutModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    UsuarioModule
  ],
  providers: [
    BsModalService,
    BsModalRef,
    CorrecaoModalComponent
  ]
})
export class PagesModule { }
