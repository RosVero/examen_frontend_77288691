import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as printJS from 'print-js';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoService } from 'src/app/services/prestamo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {
  prestamos:any=[];
  inicio:any;
  fin:any;
  //items:any[]=[];

  displayedColumns: string[] = ['#', 'cliente', 'libro', 'fecha_prestamo','dias_prestamo', 'estado'];
  dataSource: MatTableDataSource<any>;

  constructor(private _prestamo:PrestamoService) { 
    this.loadPrestamos();
  }

  ngOnInit(): void {
  }

  download(){
    const DATA = document.getElementById('formulario');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`reporte-clientes.pdf`);
    });
  }

  print(){
    printJS('formulario', 'html');
  }

  loadPrestamos(){
    this._prestamo.getPrestamosAutorLibro().subscribe((res:any)=>{
      if(res.length>0){
        this.prestamos = res;
        this.dataSource = this.prestamos;
      }
    })
  }

  rango(fechas:any){
    // console.log(fechas)
    // return;
    this._prestamo.getPrestamosByRange(fechas).subscribe((res:any)=>{
        this.prestamos = res;
        this.dataSource = this.prestamos;
      if(res.length==0){
        Swal.fire(
          'Error!',
          'No existen registros en ese rango, intente otra vez'
        )
      }
    })
  }
  
  limpiar(){
    this.inicio ='';
    this.fin='';
    this.loadPrestamos();
  }
}
