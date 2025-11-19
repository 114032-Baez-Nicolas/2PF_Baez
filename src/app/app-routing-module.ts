import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AbmAlumnosComponent } from './features/alumnos/components/abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './features/alumnos/components/lista-alumnos/lista-alumnos.component';
import { LoginComponent } from './features/auth/login.component';
import { AbmCursosComponent } from './features/cursos/components/abm-cursos/abm-cursos.component';
import { ListaCursosComponent } from './features/cursos/components/lista-cursos/lista-cursos.component';
import { InicioComponent } from './features/dashboard/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'alumnos', component: ListaAlumnosComponent, canActivate: [authGuard] },
  { path: 'alumnos/nuevo', component: AbmAlumnosComponent, canActivate: [authGuard] },
  { path: 'cursos', component: ListaCursosComponent, canActivate: [authGuard] },
  { path: 'cursos/nuevo', component: AbmCursosComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
