import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../models/alumno.interface';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css',
  standalone: false,
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'fechaInscripcion',
    'activo',
    'acciones',
  ];

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
      },
    });
  }

  eliminarAlumno(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.eliminarAlumno(id);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El alumno ha sido eliminado correctamente',
          icon: 'success',
          confirmButtonColor: '#3f51b5',
          timer: 2000,
        });
      }
    });
  }
}
