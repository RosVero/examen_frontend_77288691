import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

import { ActivatedRoute, Route, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente:any={
    name:'',
    email:'',
    celular:0
  }


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _cliente:ClienteService
  ) { 


  }

  ngOnInit(): void {
    if(this.data.id != 0){
      this._cliente.getCliente(this.data.id).subscribe(res =>{
        this.cliente = res;
      })
    }
  }

  guardar(object:any){
    if(this.data.id != 0){
      
      this._cliente.updateCliente(object, this.data.id).subscribe((res)=>{
        this._cliente.notificacion.emit(res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El cliente se ha modificado de manera satisfactoria',
          showConfirmButton: false,
          timer: 1500
        });

        this.dialogRef.close();
      })
    }
    else{
      this._cliente.saveCliente(object).subscribe(res=>{
        this._cliente.notificacion.emit(res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El cliente se ha creado de manera satisfactoria',
          showConfirmButton: false,
          timer: 1500
        });

        this.dialogRef.close();
      })
    }
  }

}
