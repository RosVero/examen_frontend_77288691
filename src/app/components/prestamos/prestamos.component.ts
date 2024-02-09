import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoService } from 'src/app/services/prestamo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  prestamos:any[]=[];
  prestamo:any;

  displayedColumns: string[] = ['id', 'libro', 'cliente', 'fecha_prestamo', 'dias_prestamo', 'estado', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _prestamo:PrestamoService) { 
    this.loadPrestamos();
    
  }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadPrestamos(){
    this._prestamo.getPrestamosAutorLibro().subscribe((res:any)=>{
      this.prestamos = res;

      this.dataSource = new MatTableDataSource(this.prestamos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  devolver(id:any){

    Swal.fire({
      title: 'Devolver Libro?',
      text: "El estado del prestamo pasara a Devuelto",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy de acuerdo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._prestamo.getPrestamo(id).subscribe((res:any) => {
          this.prestamo = res;
          this.prestamo.estado = 'Devuelto';
          this._prestamo.updatePrestamo(this.prestamo).subscribe(()=>{
            this.loadPrestamos();
          });
        })
      }})
  }
}
