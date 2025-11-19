import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TituloResaltadoDirective } from './directives/titulo-resaltado.directive';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';

// Módulos de Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NombreCompletoPipe, TituloResaltadoDirective],
  imports: [CommonModule],
  exports: [
    // Pipes y Directivas
    NombreCompletoPipe,
    TituloResaltadoDirective,

    // Módulos de Angular Material
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,

    // Forms
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {}
