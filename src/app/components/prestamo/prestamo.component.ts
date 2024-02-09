import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { LibroService } from 'src/app/services/libro.service';
import { PrestamoService } from 'src/app/services/prestamo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  clientes:any;

  libros:any[]=[{
    id:'1',
    titulo:'La niña de mis ojos',
    autor_id:1,
    lote:12313,
    description:'Descripcion del libro xd'
  }];

prestamo:any={
  cliente_id:'',
  libro_id:'',
  fecha_prestamo:'',
  estado:'',
  dias_prestamo:''
}
  
  constructor(public dialog: MatDialog, 
    private _cliente:ClienteService,
    private _libro:LibroService,
    private _prestamo:PrestamoService,
    private router:Router
    ) {

    this.loadClientes();
    this.loadLibrosSinPrestar();
   }

  ngOnInit(): void {

  }

  loadClientes(){
    const object:any={}
    this._cliente.getClientes().subscribe((res:any) =>{
      this.clientes = res;
  })
  }

  loadLibrosSinPrestar(){
    this._libro.getLibrosSinPrestamo().subscribe((res:any) =>{
      this.libros = res;
    })
  }

  prestar(datos:any){
    datos.fecha_prestamo = new Date().toLocaleDateString;
    datos.estado = 'En Prestamo';
    this._prestamo.savePrestamo(datos).subscribe((res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El prestamo se ha registrado de manera satisfactoria',
        showConfirmButton: false,
        timer: 1500
      });

      this.router.navigate(['principal/prestamos']);
    })
  }

}
