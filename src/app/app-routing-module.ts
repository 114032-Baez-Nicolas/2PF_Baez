import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmAlumnosComponent } from './features/alumnos/components/abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './features/alumnos/components/lista-alumnos/lista-alumnos.component';
import { AbmCursosComponent } from './features/cursos/components/abm-cursos/abm-cursos.component';
import { ListaCursosComponent } from './features/cursos/components/lista-cursos/lista-cursos.component';

const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'alumnos/nuevo', component: AbmAlumnosComponent },
  { path: 'cursos', component: ListaCursosComponent },
  { path: 'cursos/nuevo', component: AbmCursosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
