import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre = '';
  precio: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService, //con esto inyecto el Toastr, libreria externa
    //https://www.npmjs.com/package/ngx-toastr
    private router: Router //sirve para redirigir
    ) { }  

  ngOnInit(): void {
  }

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      data => {
         this.toastr.success('Producto Creado', 'Hecho!',{
           timeOut: 3000, positionClass: 'toast-top-center'
         });
         this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        //this.router.navigate(['/']);
      }
    )
  }

}
