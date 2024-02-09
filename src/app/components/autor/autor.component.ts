import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from 'src/app/services/autor.service';

import Swal from  'sweetalert2';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autor:any={
    name:''
  }

  constructor(public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _autor:AutorService) {
      if(this.data.id !=0){
        this.loadAutor();
      }
     }

  ngOnInit(): void {
    
  }

  loadAutor(){
    this._autor.getAutor(this.data.id).subscribe(res=>this.autor=res);
  }

  guardar(object:any){
    if(this.data.id != 0){
      this._autor.updateAutor(object, this.data.id).subscribe(res=> {
        this._autor.notificacion.emit(res)

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El autor ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
    else{
      this._autor.saveAutor(object).subscribe(res =>{
        this._autor.notificacion.emit(res);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El autor ha sido registrado',
          showConfirmButton: false,
          timer: 1500
        })

      })
    }
  }
}
