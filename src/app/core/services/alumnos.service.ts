import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../../features/alumnos/models/alumno.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private readonly STORAGE_KEY = 'alumnos';
  private alumnosIniciales: Alumno[] = [
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
  ];

  private alumnosSubject = new BehaviorSubject<Alumno[]>(this.cargarDesdeLocalStorage());
  alumnos$: Observable<Alumno[]> = this.alumnosSubject.asObservable();

  constructor() {}

  private cargarDesdeLocalStorage(): Alumno[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const alumnos = JSON.parse(data);
      return alumnos.map((a: any) => ({
        ...a,
        fechaInscripcion: new Date(a.fechaInscripcion),
      }));
    }
    return this.alumnosIniciales;
  }

  private guardarEnLocalStorage(alumnos: Alumno[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alumnos));
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  agregarAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const nuevoId = alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) + 1 : 1;
    const nuevoAlumno = { ...alumno, id: nuevoId };
    const nuevosAlumnos = [...alumnos, nuevoAlumno];
    this.guardarEnLocalStorage(nuevosAlumnos);
    this.alumnosSubject.next(nuevosAlumnos);
  }

  actualizarAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const index = alumnos.findIndex((a) => a.id === alumno.id);
    if (index !== -1) {
      alumnos[index] = alumno;
      const nuevosAlumnos = [...alumnos];
      this.guardarEnLocalStorage(nuevosAlumnos);
      this.alumnosSubject.next(nuevosAlumnos);
    }
  }

  eliminarAlumno(id: number): void {
    const alumnos = this.alumnosSubject.value.filter((a) => a.id !== id);
    this.guardarEnLocalStorage(alumnos);
    this.alumnosSubject.next(alumnos);
  }

  obtenerAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnosSubject.value.find((a) => a.id === id);
  }
}
