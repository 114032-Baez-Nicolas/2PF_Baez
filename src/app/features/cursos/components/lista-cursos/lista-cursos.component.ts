import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../models/curso.interface';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
  standalone: false,
})
export class ListaCursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  busqueda: string = '';

  constructor(private cursosService: CursosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.cursos = cursos;
      this.cursosFiltrados = cursos;
    });
  }

  filtrarCursos(): void {
    const termino = this.busqueda.toLowerCase().trim();
    if (!termino) {
      this.cursosFiltrados = [...this.cursos];
    } else {
      this.cursosFiltrados = this.cursos.filter(
        (curso) =>
          curso.nombre.toLowerCase().includes(termino) ||
          curso.descripcion.toLowerCase().includes(termino)
      );
    }
  }

  irANuevoCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editarCurso(curso: Curso): void {
    console.log('Editar curso:', curso);
  }

  eliminarCurso(curso: Curso): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Querés eliminar el curso "${curso.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosService.eliminarCurso(curso.id);
        Swal.fire({
          title: 'Eliminado',
          text: 'El curso ha sido eliminado correctamente',
          icon: 'success',
          confirmButtonColor: '#3f51b5',
        });
      }
    });
  }

  verDetalle(curso: Curso): void {
    Swal.fire({
      title: curso.nombre,
      html: `
        <p><strong>Descripción:</strong> ${curso.descripcion}</p>
        <p><strong>Fecha inicio:</strong> ${curso.fechaInicio.toLocaleDateString()}</p>
        <p><strong>Fecha fin:</strong> ${curso.fechaFin.toLocaleDateString()}</p>
        <p><strong>Estado:</strong> ${curso.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}</p>
      `,
      confirmButtonColor: '#3f51b5',
    });
  }
}
