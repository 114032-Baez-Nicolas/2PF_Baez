import { Component, HostListener } from '@angular/core';
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
  window = window;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.mostrarLayout = this.debeMostrarLayout(event.url);
        // En mobile, cerrar el sidenav automáticamente al navegar
        if (window.innerWidth < 768) {
          this.sidenavOpened = false;
        }
      });
    // Para el primer render
    this.mostrarLayout = this.debeMostrarLayout(this.router.url);
    // Ajustar sidenav según tamaño de pantalla inicial
    this.ajustarSidenavInicial();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ajustarSidenavInicial();
  }

  ajustarSidenavInicial(): void {
    if (window.innerWidth < 768) {
      this.sidenavOpened = false;
    } else {
      this.sidenavOpened = true;
    }
  }

  debeMostrarLayout(url: string): boolean {
    let urlLimpia = url.split('?')[0].split('#')[0].toLowerCase();
    if (urlLimpia.endsWith('/')) urlLimpia = urlLimpia.slice(0, -1);
    if (
      urlLimpia.includes('/login') ||
      urlLimpia.includes('/register') ||
      urlLimpia === '' ||
      urlLimpia === '/2pf_baez' ||
      urlLimpia === '/2pf_baez/' ||
      urlLimpia === '/'
    ) {
      return false;
    }
    return this.authService.estaAutenticado();
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
