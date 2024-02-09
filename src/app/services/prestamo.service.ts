import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

const base_url = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http:HttpClient) { }

  getPrestamosVigentes(){
    let url = `${base_url}/api/prestamos`;
    return this.http.get(url);
  }

  getPrestamo(id:any){
    let url = `${base_url}/api/prestamos/${id}`;
    return this.http.get(url);
  }

  getLibrosVencidos(){
    let url = `${base_url}/api/libros_vencidos`;
    return this.http.get(url);
  }

  getPrestamosAutorLibro(){
    let url = `${base_url}/api/prestamos_libro_autor`;
    return this.http.get(url);
  }

  getPrestamosByRange(data:any){
    let url = `${base_url}/api/prestamos_rango`;
    //?inicio=${data.inicio}&fin=${data.fin}
    return this.http.post(url, data);
  }

  updatePrestamo(prestamo:any){
    let url = `${base_url}/api/prestamos/${prestamo.id}`;
    return this.http.put(url, prestamo)
  }

  savePrestamo(prestamo:any){
    let url = `${base_url}/api/prestamos`;
    return this.http.post(url, prestamo)
  }
}
