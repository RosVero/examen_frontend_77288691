import { NgModule } from '@angular/core';   
import { Routes, RouterModule } from '@angular/router';  
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Pages404Component } from './components/pages404/pages404.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AutorComponent } from './components/autor/autor.component';
import { AutoresComponent } from './components/autores/autores.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Reporte1Component } from './components/reporte1/reporte1.component';
import { Reporte2Component } from './components/reporte2/reporte2.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
  
const rutas: Routes = [  
    {path:'', redirectTo:'layout', pathMatch:'full'},
    {path:'layout', component:LayoutComponent},
    {path:'principal', component:PrincipalComponent, 
    children:[
        {path:'dashboard', component:DashboardComponent},
        {path:'cliente/:id', component:ClienteComponent},
        {path:'autores', component:AutoresComponent},
        {path:'clientes', component:ClientesComponent},
        {path:'libros', component:LibrosComponent},
        {path:'reportes', component:ReportesComponent},
        {path:'reporte1', component:Reporte1Component},
        {path:'reporte2', component:Reporte2Component},
        {path:'prestamos', component:PrestamosComponent},
        {path:'prestamo', component:PrestamoComponent},
        {path:'', redirectTo:'dashboard', pathMatch:'full'},
    ]},
    {path:'**', component:Pages404Component}
];  
  
@NgModule({  
 imports: [
     RouterModule.forRoot(rutas)
    ],  
 exports: [RouterModule]  
})  
export class AppRoutingModule { } 