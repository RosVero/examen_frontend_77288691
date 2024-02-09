//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

//Componentes
import { NavbarComponent } from './navbar/navbar.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PrincipalComponent } from './principal/principal.component';
import { FooterComponent } from './footer/footer.component';

import { AutorComponent } from './autor/autor.component';
import { AutoresComponent } from './autores/autores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LibrosComponent } from './libros/libros.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LibroComponent } from './libro/libro.component';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { PrestamoComponent } from './prestamo/prestamo.component';


@NgModule({
  declarations: [
    NavbarComponent,
    ClienteComponent,
    PrincipalComponent,
    FooterComponent,
    AutorComponent,
    AutoresComponent,
    ClientesComponent,
    LibrosComponent,
    PrestamosComponent,
    ReportesComponent,
    LibroComponent,
    Reporte1Component,
    Reporte2Component,
    PrestamoComponent
  ],
  exports: [
    NavbarComponent,
    PrincipalComponent,
    ClienteComponent,
    FooterComponent,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSidenavModule,
    MatMenuModule
  ]
})
export class ComponentsModule { }
