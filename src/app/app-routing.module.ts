import { LoginComponent } from './pages/login/login.component';
import { PerguntaComponent } from './pages/pergunta/pergunta.component';
import { TurmaComponent } from './pages/turma/turma.component';
import { DisciplinaComponent } from './pages/disciplina/disciplina.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { EscolaComponent } from './pages/escola/escola.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetMeResolve } from './resolves/getMe.resolve'

const routes: Routes = [
  { path: "usuarios", component: UsuarioComponent, pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "escolas", component: EscolaComponent, pathMatch: 'full' },
  { path: "professores", component: ProfessorComponent, pathMatch: 'full' },
  { path: "alunos", component: AlunoComponent, pathMatch: 'full' },
  { path: "disciplinas", component: DisciplinaComponent, pathMatch: 'full' },
  { path: "turmas", component: TurmaComponent, pathMatch: 'full' },
  { path: "logins", component: LoginComponent, pathMatch: 'full' },
  { path: "perguntas", component: PerguntaComponent, pathMatch: 'full', resolve: { professor: GetMeResolve } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
