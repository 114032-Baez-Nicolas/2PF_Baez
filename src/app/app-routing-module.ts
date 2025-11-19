import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmAlumnosComponent } from './features/alumnos/components/abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './features/alumnos/components/lista-alumnos/lista-alumnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'alumnos/nuevo', component: AbmAlumnosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
