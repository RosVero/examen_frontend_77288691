import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  notificacion = new EventEmitter<any>();
  clientes:any[]=[];

  constructor(private http:HttpClient) { 
    //this.prueba();
    this.getClientes().subscribe((res:any)=>this.clientes = res);
  }
  getClientes(){
    let url = `${base_url}/api/clientes`;
    return this.http.get(url);
  }

  getCliente(id:any){
   let url = `${base_url}/api/clientes/${id}`;
   return this.http.get(url);
  }

  saveCliente(data:any){
     let url = `${base_url}/api/clientes`;
     return this.http.post(url, data);
  }

  updateCliente(data:any, id:any){
     let url = `${base_url}/api/clientes/${id}`;
     return this.http.put(url, data);
  }

  deleteCliente(id:any){
    let url = `${base_url}/api/clientes/${id}`;
    return this.http.delete(url)
  }
  
}
