import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AutorService } from 'src/app/services/autor.service';
import { AutorComponent } from '../autor/autor.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  autores:any[]=[
    {
    id:1,
    name:'Miguel de Cervantes Saavedra'
    }, 
    {
      id:2,
      name:'Gabriel Garcia Marquez'
    }
];

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _autor:AutorService
    ) {
    this.loadAutores();
   }

  ngOnInit(): void {
    this._autor.notificacion.subscribe(
      resp=>this.loadAutores()
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAutores(){
      this._autor.getAutores().subscribe((res:any)=>{
        this.autores = res;

        this.dataSource = new MatTableDataSource(this.autores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  nuevoAutor(){
    this.dialog.open(AutorComponent, 
      {
        width:'420px', 
        data:{
          id:0
        }
      });
  }

  editarAutor(id:any){
    this.dialog.open(AutorComponent, 
      {
        width:'420px', 
        data:{
          id
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
        this._autor.deleteAutor(id).subscribe(res => {
          this._autor.notificacion.emit(res);
          
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado'
          )
        })
        
      }
    })
  }
}
