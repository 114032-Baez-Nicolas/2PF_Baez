import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: false,
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggle(): void {
    this.toggleSidenav.emit();
  }
}
