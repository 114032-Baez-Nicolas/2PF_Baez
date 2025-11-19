import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';

@NgModule({
  declarations: [ListaAlumnosComponent, AbmAlumnosComponent],
  imports: [CommonModule, SharedModule],
  exports: [ListaAlumnosComponent, AbmAlumnosComponent],
})
export class AlumnosModule {}
