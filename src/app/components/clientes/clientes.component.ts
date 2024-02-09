import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteComponent } from '../cliente/cliente.component';
import { MatDialog} from '@angular/material/dialog';

import Swal from 'sweetalert2'
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:any[]=[];

  displayedColumns: string[] = ['id', 'name', 'email', 'celular', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _cliente: ClienteService
    ) {
      this.loadClientes();
   }

  ngOnInit(): void {
    this._cliente.notificacion.subscribe(
      resp=>this.loadClientes()
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadClientes(){
    this._cliente.getClientes().subscribe((res:any) => {
      this.clientes = res;

      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  nuevo(){
    this.dialog.open(ClienteComponent, 
      {
        width:'400px', 
        data:{
          id:0
        }
      });
  }

  editar(id:any){
    this.dialog.open(ClienteComponent, 
      {
        width:'400px', 
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
        this._cliente.deleteCliente(id).subscribe(res => {
          this._cliente.notificacion.emit(res);
          
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado'
          )
        })
        
      }
    })
  }
}
