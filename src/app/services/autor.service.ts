import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  notificacion = new EventEmitter<any>()
  
  constructor(private http:HttpClient) {

   }

   getAutores(){
     let url = `${base_url}/api/autores`;
     return this.http.get(url);
   }

   getAutor(idAutor:any){
    let url = `${base_url}/api/autores/${idAutor}`;
    return this.http.get(url);
   }

   saveAutor(data:any){
      let url = `${base_url}/api/autores`;
      return this.http.post(url, data);
   }

   updateAutor(data:any, id:any){
      let url = `${base_url}/api/autores/${id}`;
      return this.http.put(url, data);
   }

   deleteAutor(id:any){
     let url = `${base_url}/api/autores/${id}`;
     return this.http.delete(url)
   }
}
