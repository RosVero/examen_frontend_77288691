import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoService } from 'src/app/services/prestamo.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as printJS from 'print-js';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {
  prestamos:any;
  //items:any[]=[];

  displayedColumns: string[] = ['#', 'cliente', 'libro', 'fecha_prestamo','dias_prestamo', 'vencimiento', 'demora'];
  dataSource: MatTableDataSource<any>;

  constructor(private _prestamo:PrestamoService) { }

  ngOnInit(): void {
   this.loadPrestamos();
  }

  loadPrestamos(){
    // const actual = Date.now();
    // this._prestamo.getPrestamosVigentes().subscribe(res => {
    //   this.prestamos = res;
    //   const aux = this.prestamos.filter((element:any)=>{
    //     let fechavencimiento = new Date(element.fecha_prestamo).setDate(element.dias_prestamo);
    //     if(actual > fechavencimiento && element.estado === 'En Prestamo'){
    //         return element;
    //     }
    //   });

    //   this.dataSource = aux;
    // })
    this._prestamo.getLibrosVencidos().subscribe(res =>{
      this.prestamos = res;
      console.log(this.prestamos);

      this.dataSource = this.prestamos;
    })
  }

  download(){
    const DATA = document.getElementById('htmlData');
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

}
