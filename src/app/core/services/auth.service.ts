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

  private readonly CREDENCIAL_PRUEBA = {
    username: 'testprueba@gmail.com',
    password: '1234p',
    nombre: 'Nicolás',
  };

  constructor() {}

  private obtenerUsuarioActual(): Usuario | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
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
    if (
      username === this.CREDENCIAL_PRUEBA.username &&
      password === this.CREDENCIAL_PRUEBA.password
    ) {
      const usuarioPrueba: Usuario = {
        username: this.CREDENCIAL_PRUEBA.username,
        password: this.CREDENCIAL_PRUEBA.password,
        nombre: this.CREDENCIAL_PRUEBA.nombre,
      };
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(usuarioPrueba));
      this.usuarioActualSubject.next(usuarioPrueba);
      return of({ success: true, message: 'Inicio de sesión exitoso', usuario: usuarioPrueba });
    }

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
