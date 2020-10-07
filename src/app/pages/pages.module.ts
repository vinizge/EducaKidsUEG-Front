import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioModule } from './usuario/usuario.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent],
  imports: [
    CommonModule,
    UsuarioModule
  ],
  exports: [
    UsuarioModule
  ]
})
export class PagesModule { }
