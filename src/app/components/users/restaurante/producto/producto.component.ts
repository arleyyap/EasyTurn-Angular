import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from './../../../../domain/producto';
import { ProductoService } from './../../../../services/producto/producto.service';
import { AuthService } from './../../../../services/auth.service';
import { NotificationService } from './../../../../services/notification/notification.service';
import { RestauranteService } from './../../../../services/restaurante/restaurante.service';
import { UsuariosService } from './../../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public producto: Producto;

  constructor(private storage: AngularFireStorage, public productoService: ProductoService, private authService: AuthService,
              private notificationService: NotificationService, public restauranteService: RestauranteService,
              public usuarioService: UsuariosService
    ) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImagenCompleta: string;

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  ngOnInit() {

    this.producto = new Producto(null, '', '', 0, 0, '', 22);
    /*this.authService.isAuth().subscribe(user => {
      console.log(user.email.toString())
      this.usuarioService.findById(user.email.toString()).subscribe((data:any)=>{
        console.log(data);
      });

    });*/
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/producto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).toPromise()
    .then((res) => {
      this.urlImage.toPromise().then(resolve => {
        console.log(resolve);
        this.urlImagenCompleta = resolve.toString();
        console.log('Esta es mi ruta absoluta', this.urlImagenCompleta);
      });
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    }
    );
  }

  adicionarProducto() {
    this.producto.imagenproducto = this.urlImagenCompleta;
    console.log('Producto', this.producto);
    this.productoService.save(this.producto).subscribe(resultado =>{
      this.notificationService.showSuccess('El Producto se Registro con Exito', 'Notificación');
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    }
    );
  }
}
