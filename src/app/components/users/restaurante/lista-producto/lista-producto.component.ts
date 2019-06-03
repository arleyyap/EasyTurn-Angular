import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../../services/auth.service';
import { NotificationService } from './../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../../services/usuarios/usuarios.service';
import { RestauranteService } from './../../../../services/restaurante/restaurante.service';
import { ProductoService } from './../../../../services/producto/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {
  headElements = ['ID', 'Nombre', 'Descripcion', 'Cantidad', 'Precio Unidad', 'Imagen', 'Opciones'];
  productos: any;
  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router,
              public usuarioService: UsuariosService, public restauranteService: RestauranteService,
              public productoService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.authService.isAuth().subscribe(userFirebase => {
      this.usuarioService.findById(userFirebase.email.toString()).subscribe((userPostgres: any) => {
        this.restauranteService.findRestauranteByUsuario(userFirebase.email.toString()).subscribe((restaurante: any) => {
          console.log('Estos son los restaurantes que tiene el usuario', restaurante[0]['idrestaurante']);
          console.log('Este es id del restauarante', restaurante[0]['idrestaurante']);
          this.productoService.findProductoByRestaurante(restaurante[0]['idrestaurante']).subscribe((productos: any) => {
            console.log('Estos son los productos del restaurante', productos);
            this.productos = productos;
          });
        }, error => {
          this.notificationService.showError(error.message, 'Error');
          this.notificationService.showWarning(
            'Esta funcionalidad no se encuentra disponible en este momento debido a problemas de conexión con el Servidor', 'Advertencia');
          this.router.navigate(['user/restaurante/restaurante']);
        });
      }, error => {
        this.notificationService.showError(error.message, 'Error');
        this.notificationService.showWarning(
          'Esta funcionalidad no se encuentra disponible en este momento debido a problemas de conexión con el Servidor', 'Advertencia');
        this.router.navigate(['user/restaurante/restaurante']);
      });
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    });
  }

  deleteProducto(producto: string ) {
    console.log('Este es el producto que llega', producto);
    this.productoService.delete(producto).subscribe(data=>{
      console.log(data);
      this.notificationService.showSuccess('Se ha eliminado correctamente el Producto' , 'Notificación');
      this.ngOnInit();
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    });
  }

}
