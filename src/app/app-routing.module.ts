import { ProfessorComponent } from './pages/professor/professor.component';
import { EscolaComponent } from './pages/escola/escola.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "usuarios", component: UsuarioComponent, pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "escolas", component: EscolaComponent, pathMatch: 'full' },
  { path: "professores", component: ProfessorComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
