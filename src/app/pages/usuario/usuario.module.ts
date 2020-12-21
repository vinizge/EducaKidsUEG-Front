import { UsuarioService } from './../../services/usuario.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    FlexLayoutModule
  ],
  exports: [
    UsuarioComponent,
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
