import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url; 
 
@Injectable({
  providedIn: 'root'
})
export class LibroService {
  notificacion = new EventEmitter<any>();

  constructor(
    private http:HttpClient
  ) { }

  getLibros(){
    let url = `${base_url}/api/libros`;
    return this.http.get(url);
  }

  getLibrosSinPrestamo(){
    let url = `${base_url}/api/libros_sin_prestamo`;
    return this.http.get(url);
  }

  getlibro(idLibro:any){
   let url = `${base_url}/api/libros/${idLibro}`;
   return this.http.get(url);
  }

  getLibrosAutor(){
    let url = `${base_url}/api/libros_autor`;
    return this.http.get(url);
   }

  saveLibro(data:any){
     let url = `${base_url}/api/libros`;
     return this.http.post(url, data);
  }

  updateLibro(data:any, id:any){
     let url = `${base_url}/api/libros/${id}`;
     return this.http.put(url, data);
  }

  deleteLibro(id:any){
    let url = `${base_url}/api/libros/${id}`;
    return this.http.delete(url)
  }
}
