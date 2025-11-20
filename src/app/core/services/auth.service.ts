import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'usuarios';
  private readonly CURRENT_USER_KEY = 'usuarioActual';
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioActual());
  usuarioActual$: Observable<Usuario | null> = this.usuarioActualSubject.asObservable();

  constructor() {
    this.inicializarUsuarioDePrueba();
  }

  private obtenerUsuarioActual(): Usuario | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  private inicializarUsuarioDePrueba(): void {
    const usuarios = this.obtenerUsuarios();
    const usuarioPrueba = {
      username: 'testuser@gmail.com',
      password: '12345p',
      nombre: 'Usuario de Prueba',
    };
    if (!usuarios.some((u) => u.username === usuarioPrueba.username)) {
      usuarios.push(usuarioPrueba);
      this.guardarUsuarios(usuarios);
    }
  }

  private obtenerUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private guardarUsuarios(usuarios: Usuario[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(usuarios));
  }

  registrar(
    username: string,
    password: string,
    nombre: string
  ): Observable<{ success: boolean; message: string }> {
    const usuarios = this.obtenerUsuarios();

    if (usuarios.some((u) => u.username === username)) {
      return of({ success: false, message: 'El usuario ya existe' });
    }

    const nuevoUsuario: Usuario = { username, password, nombre };
    usuarios.push(nuevoUsuario);
    this.guardarUsuarios(usuarios);

    return of({ success: true, message: 'Usuario registrado correctamente' });
  }

  login(
    username: string,
    password: string
  ): Observable<{ success: boolean; message: string; usuario?: Usuario }> {
    const usuarios = this.obtenerUsuarios();
    const usuario = usuarios.find((u) => u.username === username && u.password === password);

    if (usuario) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(usuario));
      this.usuarioActualSubject.next(usuario);
      return of({ success: true, message: 'Inicio de sesión exitoso', usuario });
    }

    return of({ success: false, message: 'Usuario o contraseña incorrectos' });
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.usuarioActualSubject.next(null);
  }

  estaAutenticado(): boolean {
    return this.usuarioActualSubject.value !== null;
  }

  obtenerNombreUsuario(): string {
    return this.usuarioActualSubject.value?.nombre || '';
  }
}
