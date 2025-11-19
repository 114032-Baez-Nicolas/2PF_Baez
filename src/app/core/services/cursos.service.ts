import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../../features/cursos/models/curso.interface';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly STORAGE_KEY = 'cursos';
  private cursosIniciales: Curso[] = [
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
  ];

  private cursosSubject = new BehaviorSubject<Curso[]>(this.cargarDesdeLocalStorage());
  cursos$: Observable<Curso[]> = this.cursosSubject.asObservable();

  constructor() {}

  private cargarDesdeLocalStorage(): Curso[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const cursos = JSON.parse(data);
      return cursos.map((c: any) => ({
        ...c,
        fechaInicio: new Date(c.fechaInicio),
        fechaFin: new Date(c.fechaFin),
      }));
    }
    return this.cursosIniciales;
  }

  private guardarEnLocalStorage(cursos: Curso[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cursos));
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  agregarCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const nuevoId = cursos.length > 0 ? Math.max(...cursos.map((c) => c.id)) + 1 : 1;
    const nuevoCurso = { ...curso, id: nuevoId };
    const nuevosCursos = [...cursos, nuevoCurso];
    this.guardarEnLocalStorage(nuevosCursos);
    this.cursosSubject.next(nuevosCursos);
  }

  actualizarCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const index = cursos.findIndex((c) => c.id === curso.id);
    if (index !== -1) {
      cursos[index] = curso;
      const nuevosCursos = [...cursos];
      this.guardarEnLocalStorage(nuevosCursos);
      this.cursosSubject.next(nuevosCursos);
    }
  }

  eliminarCurso(id: number): void {
    const cursos = this.cursosSubject.value.filter((c) => c.id !== id);
    this.guardarEnLocalStorage(cursos);
    this.cursosSubject.next(cursos);
  }

  obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursosSubject.value.find((c) => c.id === id);
  }
}
