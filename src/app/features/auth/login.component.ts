import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registroForm!: FormGroup;
  mostrarRegistro = false;
  isDarkMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit(): void {
    this.inicializarFormularios();
  }

  inicializarFormularios(): void {
    this.loginForm = this.fb.group({
      username: ['testprueba@gmail.com', [Validators.required]],
      password: ['1234p', [Validators.required]],
    });

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe((resultado) => {
        if (resultado.success) {
          this.router.navigate(['/inicio']);
        } else {
          Swal.fire({
            title: 'Error',
            text: resultado.message,
            icon: 'error',
            confirmButtonColor: '#3f51b5',
          });
        }
      });
    }
  }

  onRegistro(): void {
    if (this.registroForm.valid) {
      const { username, password, nombre } = this.registroForm.value;
      this.authService.registrar(username, password, nombre).subscribe((resultado) => {
        if (resultado.success) {
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Ahora podés iniciar sesión',
            icon: 'success',
            confirmButtonColor: '#3f51b5',
          });
          this.mostrarRegistro = false;
          this.registroForm.reset();
        } else {
          Swal.fire({
            title: 'Error',
            text: resultado.message,
            icon: 'error',
            confirmButtonColor: '#3f51b5',
          });
        }
      });
    }
  }

  cambiarModo(): void {
    this.mostrarRegistro = !this.mostrarRegistro;
    if (!this.mostrarRegistro) {
      this.loginForm.patchValue({
        username: 'testprueba@gmail.com',
        password: '1234p'
      });
    }
    this.registroForm.reset();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
