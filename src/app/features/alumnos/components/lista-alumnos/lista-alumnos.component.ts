import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../models/alumno.interface';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
  standalone: false,
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnosFiltrados: Alumno[] = [];
  busqueda: string = '';

  constructor(private alumnosService: AlumnosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
      this.alumnosFiltrados = alumnos;
    });
  }

  filtrarAlumnos(): void {
    const termino = this.busqueda.toLowerCase().trim();
    if (!termino) {
      this.alumnosFiltrados = [...this.alumnos];
    } else {
      this.alumnosFiltrados = this.alumnos.filter(
        (alumno) =>
          alumno.nombre.toLowerCase().includes(termino) ||
          alumno.apellido.toLowerCase().includes(termino) ||
          alumno.email.toLowerCase().includes(termino)
      );
    }
  }

  irANuevoAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(alumno: Alumno): void {
    console.log('Editar alumno:', alumno);
  }

  eliminarAlumno(alumno: Alumno): void {
    Swal.fire({
      title: '¿Eliminar alumno?',
      text: `¿Querés eliminar a ${alumno.nombre} ${alumno.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.eliminarAlumno(alumno.id);
        Swal.fire({
          title: 'Eliminado',
          text: 'El alumno fue eliminado',
          icon: 'success',
          confirmButtonColor: '#3f51b5',
        });
      }
    });
  }

  verDetalle(alumno: Alumno): void {
    Swal.fire({
      title: `${alumno.nombre} ${alumno.apellido}`,
      html: `
        <div style="text-align: left;">
          <p><strong>Email:</strong> ${alumno.email}</p>
          <p><strong>Inscripción:</strong> ${alumno.fechaInscripcion.toLocaleDateString()}</p>
          <p><strong>Estado:</strong> ${alumno.activo ? '✅ Activo' : '❌ Inactivo'}</p>
        </div>
      `,
      confirmButtonColor: '#3f51b5',
    });
  }
}
