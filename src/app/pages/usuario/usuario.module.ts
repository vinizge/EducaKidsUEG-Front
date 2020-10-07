import { UsuarioService } from './../../services/usuario.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'

@NgModule({
  declarations: [
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule
  ],
  exports: [
    UsuarioComponent,
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
