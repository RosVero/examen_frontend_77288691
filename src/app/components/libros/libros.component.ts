import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LibroService } from 'src/app/services/libro.service';
import { LibroComponent } from '../libro/libro.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  libros:any[]=[];

  displayedColumns: string[] = ['id', 'titulo', 'autor_id', 'lote', 'description', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _libro:LibroService,
    public dialog: MatDialog
  ) {
    this.loadLibros();
   }

  ngOnInit(): void {
    this._libro.notificacion.subscribe(
      resp=>this.loadLibros()
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadLibros(){
    this._libro.getLibrosAutor().subscribe((res:any) => 
    {
      this.libros = res;

      this.dataSource = new MatTableDataSource(this.libros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
     );
  }

  nuevoLibro(){
    this.dialog.open(LibroComponent, 
      {
        width:'400px', 
        data:{
          id:0
        }
      });
  }

  editarLibro(idLibro:any) {
    this.dialog.open(LibroComponent, 
      {
        width:'400px', 
        data:{
          id:idLibro
        }
      });
  }

  eliminar(id:any){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se podra revertir la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._libro.deleteLibro(id).subscribe(res => {
          this._libro.notificacion.emit(res);
          
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado'
          )
        })
        
      }
    })
  }
}
