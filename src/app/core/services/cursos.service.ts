import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../../features/cursos/models/curso.interface';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursosSubject = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      nombre: 'Angular Básico',
      descripcion: 'Aprendé los fundamentos de Angular desde cero',
      fechaInicio: new Date('2024-01-10'),
      fechaFin: new Date('2024-03-10'),
      estado: 'activo',
    },
    {
      id: 2,
      nombre: 'TypeScript Avanzado',
      descripcion: 'Dominá TypeScript y sus características más potentes',
      fechaInicio: new Date('2024-02-01'),
      fechaFin: new Date('2024-04-01'),
      estado: 'activo',
    },
    {
      id: 3,
      nombre: 'RxJS en la Práctica',
      descripcion: 'Todo sobre programación reactiva con RxJS',
      fechaInicio: new Date('2023-11-15'),
      fechaFin: new Date('2024-01-15'),
      estado: 'inactivo',
    },
  ]);

  cursos$: Observable<Curso[]> = this.cursosSubject.asObservable();

  constructor() {}

  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  agregarCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const nuevoId = cursos.length > 0 ? Math.max(...cursos.map((c) => c.id)) + 1 : 1;
    const nuevoCurso = { ...curso, id: nuevoId };
    this.cursosSubject.next([...cursos, nuevoCurso]);
  }

  actualizarCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const index = cursos.findIndex((c) => c.id === curso.id);
    if (index !== -1) {
      cursos[index] = curso;
      this.cursosSubject.next([...cursos]);
    }
  }

  eliminarCurso(id: number): void {
    const cursos = this.cursosSubject.value.filter((c) => c.id !== id);
    this.cursosSubject.next(cursos);
  }

  obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursosSubject.value.find((c) => c.id === id);
  }
}
