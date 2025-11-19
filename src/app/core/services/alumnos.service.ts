import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../../features/alumnos/models/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnosSubject = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      fechaInscripcion: new Date('2024-01-15'),
      activo: true,
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@example.com',
      fechaInscripcion: new Date('2024-02-20'),
      activo: true,
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos.rodriguez@example.com',
      fechaInscripcion: new Date('2024-03-10'),
      activo: false,
    },
  ]);

  alumnos$: Observable<Alumno[]> = this.alumnosSubject.asObservable();

  constructor() {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  agregarAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const nuevoId = alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) + 1 : 1;
    const nuevoAlumno = { ...alumno, id: nuevoId };
    this.alumnosSubject.next([...alumnos, nuevoAlumno]);
  }

  actualizarAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const index = alumnos.findIndex((a) => a.id === alumno.id);
    if (index !== -1) {
      alumnos[index] = alumno;
      this.alumnosSubject.next([...alumnos]);
    }
  }

  eliminarAlumno(id: number): void {
    const alumnos = this.alumnosSubject.value.filter((a) => a.id !== id);
    this.alumnosSubject.next(alumnos);
  }

  obtenerAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnosSubject.value.find((a) => a.id === id);
  }
}
