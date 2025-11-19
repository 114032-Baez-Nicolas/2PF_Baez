import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: false,
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onToggle(): void {
    this.toggleSidenav.emit();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
