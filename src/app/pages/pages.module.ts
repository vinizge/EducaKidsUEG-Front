import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioModule } from './usuario/usuario.module';
import { HomeComponent } from './home/home.component';
import { EscolaComponent } from './escola/escola.component';

@NgModule({
  declarations: [
    HomeComponent,
    EscolaComponent],
  imports: [
    CommonModule,
    UsuarioModule
  ],
  exports: [
    UsuarioModule
  ]
})
export class PagesModule { }
