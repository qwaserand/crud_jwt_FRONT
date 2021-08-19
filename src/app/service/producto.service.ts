import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //es la url del request mapping de nuestro controller backend
  // es importante que termine con slash
  productoURL = environment.productoURL;

  constructor(private httpclient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpclient.get<Producto[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Producto> {
    return this.httpclient.get<Producto>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    return this.httpclient.get<Producto>(this.productoURL + `detail/${nombre}`);
  }

  //como no devuelve nada pongo 'any', si no hay request body pongo llaves vacias
  //en vez de 'producto' en el return
  public save(producto: Producto): Observable<any> {
    return this.httpclient.post<any>(this.productoURL + 'create', producto);
  }
   
  public update(id: number, producto: Producto): Observable<any> {
    return this.httpclient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpclient.delete<any>(this.productoURL + `delete/${id}`);
  }
}









