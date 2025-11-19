import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';

@NgModule({
  declarations: [ListaCursosComponent],
  imports: [CommonModule, SharedModule],
  exports: [ListaCursosComponent],
})
export class CursosModule {}
