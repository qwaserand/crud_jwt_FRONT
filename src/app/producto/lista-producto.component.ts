import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  //roles: string[];
  isAdmin = false;
  
  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService,
    private tokenService: TokenService 
    ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
    // this.roles = this.tokenService.getAuthorities();
    // this.roles.forEach(rol => {
    //   if (rol === 'ROLE_ADMIN') {
    //     this.isAdmin = true;
    //   }
    // })
  }

  cargarProductos(): void { 
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'Hecho!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    )
  }

}
