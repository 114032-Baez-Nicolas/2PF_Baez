import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../features/alumnos/models/alumno.interface';

@Pipe({
  name: 'nombreCompleto',
  standalone: false,
})
export class NombreCompletoPipe implements PipeTransform {
  transform(alumno: Alumno): string {
    if (!alumno) {
      return '';
    }
    return `${alumno.nombre} ${alumno.apellido}`;
  }
}
