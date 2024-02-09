import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from 'src/app/services/autor.service';
import { LibroService } from 'src/app/services/libro.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libro:any={
    titulo:'',
    autor_id:'',
    lote:0,
    description:''
  }

  autores:any[]=[];

  constructor(
    private _autor:AutorService,
    private _libro:LibroService,
    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.getAutores();
  }

  ngOnInit(): void {
    if(this.data.id != 0){
      this._libro.getlibro(this.data.id).subscribe(res =>{
        this.libro = res
      })
    }
  }

  guardar(object:any){
    if(this.data.id != 0){
      
      this._libro.updateLibro(object, this.data.id).subscribe((res)=>{
        this._libro.notificacion.emit(res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro se ha modificado de manera satisfactoria',
          showConfirmButton: false,
          timer: 1500
        });

        this.dialogRef.close();
      })
    }
    else{
      this._libro.saveLibro(object).subscribe(res=>{
        this._libro.notificacion.emit(res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El libro se ha creado de manera satisfactoria',
          showConfirmButton: false,
          timer: 1500
        });

        this.dialogRef.close();
      })
    }
  }

  getAutores(){
    this._autor.getAutores().subscribe((res:any) => {
        this.autores = res;
    })
  }

}
