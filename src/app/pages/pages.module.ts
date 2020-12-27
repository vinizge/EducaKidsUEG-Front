import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioModule } from './usuario/usuario.module';
import { HomeComponent } from './home/home.component';
import { EscolaComponent } from './escola/escola.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorComponent } from './professor/professor.component';

@NgModule({
  declarations: [
    HomeComponent,
    EscolaComponent,
    ProfessorComponent],
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
