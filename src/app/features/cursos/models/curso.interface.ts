export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'activo' | 'inactivo';
}
