import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DataApiService } from './../../../services/data-api.service';
import { map } from 'rxjs/operators';
import { NotificationService } from './../../../services/notification/notification.service';
import { NavbarComponent } from './../../navbar/navbar.component';

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
              private notificationService: NotificationService) {}
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
              this.router.navigate(['user/restaurante/restaurante']);

            } else if (data.tipoUsuario == 2) {
              console.log('Bienvenido Tipo de Usuario Administrativo');
              this.notificationService.showSuccess('Bienvenido Tipo de Usuario Administrativo', 'Notificación');
              this.router.navigate(['user/administrativo']);
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
