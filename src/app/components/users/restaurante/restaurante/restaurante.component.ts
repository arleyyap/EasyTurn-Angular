import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Restaurante } from 'src/app/domain/restaurante';
import { RestauranteService } from './../../../../services/restaurante/restaurante.service';
import { AuthService } from './../../../../services/auth.service';
import { NotificationService } from './../../../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  public restaurante: Restaurante;
  constructor(private storage: AngularFireStorage, public restauranteService: RestauranteService, private authService: AuthService,
              private notificationService: NotificationService, private router: Router
  ) { }


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImagenCompleta: string;

  ngOnInit() {
    console.log('Esta es la variable local restaurante', localStorage.getItem('tipoUsuario'));
    this.restaurante = new Restaurante(null, '', '', 0, '', '');
    this.authService.isAuth().subscribe(user => {
      this.restaurante.email_Usuarios =  user.email.toString();
    });
    console.log('Esto es Restaurante', this.restaurante);
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/restaurante_${id}`;
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

  onAddUser() {
    console.log('URL IMAGEN', this.urlImagenCompleta);
    this.restaurante.imagenrestaurante = this.urlImagenCompleta;
    console.log('Restaurante', this.restaurante);
    this.restauranteService.save(this.restaurante).subscribe(resultado => {
      this.notificationService.showSuccess('El Restaurante se Registro con Exito', 'Notificación');
      //this.router.navigate(['user/restaurante/producto']);
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    }
    );
  }
}
