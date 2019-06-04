import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DataApiService } from './../../../services/data-api.service';
import { map, isEmpty } from 'rxjs/operators';
import { NotificationService } from './../../../services/notification/notification.service';
import { NavbarComponent } from './../../navbar/navbar.component';
import { RestauranteService } from './../../../services/restaurante/restaurante.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   *  Se inicializa la Authentication de Firebase
   *  Se inicializa el servicio de AuthService
   *  Se inicializa el servicio de DataApiService
   */
  constructor(public afAuth: AngularFireAuth, private router: Router,
              private authService: AuthService, private dataApiService: DataApiService,
              private notificationService: NotificationService,public restauranteService: RestauranteService) {}
  public email: string;
  public password: string;

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.dataApiService.searchUserForEmail(this.email)
        .pipe(map(docArray => {
          return docArray.map(doc => {
            const data = {
              id: doc.payload.doc.id,
              nombre: doc.payload.doc.data()['nombre'],
              apellido: doc.payload.doc.data()['apellido'],
              telefono: doc.payload.doc.data()['telefono'],
              email: doc.payload.doc.data()['email'],
              contrasena: doc.payload.doc.data()['contraseña'],
              tipoUsuario: doc.payload.doc.data()['tipoUsuario']
            };
            localStorage.setItem('tipoUsuario', data.tipoUsuario);
            if (data.tipoUsuario == 1) {
              console.log('Bienvenido Tipo de Usuario Restaurante');
              this.notificationService.showSuccess('Bienvenido Tipo de Usuario Restaurante', 'Notificación');
              console.log('Este es el correo', data.email);
              this.restauranteService.findRestauranteByUsuario(data.email).subscribe((restaurante: any) => {
                console.log('Estos son los restaurantes que tiene el usuario', restaurante);
                if (restaurante['length'] >= 1) {
                  console.log('Usted ya tiene un restaurante por lo tanto no puede crear restaurante');
                  this.router.navigate(['user/restaurante/producto']);
                } else {
                  console.log('Usted no tiene restaurante');
                  this.router.navigate(['user/restaurante/restaurante']);
                }
                console.log('Este es el tamaño del restaurante', restaurante['length']);
              }, error => {
                  this.notificationService.showError(error.message, 'Error');
                  this.notificationService.showWarning(
                    'Esta funcionalidad no se encuentra disponible en este momento debido a problemas de conexión con el Servidor', 'Advertencia');
                });



            } else if (data.tipoUsuario == 2) {
              console.log('Bienvenido Tipo de Usuario Administrativo');
              this.notificationService.showSuccess('Bienvenido Tipo de Usuario Administrativo', 'Notificación');
              this.router.navigate(['user/roles']);
            } else {
              this.notificationService.showWarning('No estas autorizado para entrar', 'Notificación');
            }
          });
        }))
        .subscribe(exercices => {
        });
      }).catch(err => this.notificationService.showError(err.message, 'Error'));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        console.log('resUser', res);
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['user/restaurante/restaurante']);
  }
}
