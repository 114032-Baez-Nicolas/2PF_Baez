import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  sidenavOpened = true;
  mostrarLayout = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.mostrarLayout = this.debeMostrarLayout(event.url);
      });
    // Para el primer render
    this.mostrarLayout = this.debeMostrarLayout(this.router.url);
  }

  debeMostrarLayout(url: string): boolean {
    const urlLimpia = url.split('?')[0].split('#')[0];
    const enLogin = urlLimpia === '/login' || urlLimpia === '/' || urlLimpia === '';
    const autenticado = this.authService.estaAutenticado();
    return !enLogin && autenticado;
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
