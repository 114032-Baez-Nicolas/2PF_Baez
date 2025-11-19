import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { AlumnosModule } from './features/alumnos/alumnos.module';
import { AuthModule } from './features/auth/auth.module';
import { CursosModule } from './features/cursos/cursos.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    AlumnosModule,
    AuthModule,
    CursosModule,
    DashboardModule,
    SharedModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
