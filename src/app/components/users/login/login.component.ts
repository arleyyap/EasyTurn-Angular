import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, database } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DataApiService } from './../../../services/data-api.service';
import { map, isEmpty } from 'rxjs/operators';
import { NotificationService } from './../../../services/notification/notification.service';
import { NavbarComponent } from './../../navbar/navbar.component';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseReference } from '@angular/fire/database/interfaces';

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
  isError:any;
  constructor(public afAuth: AngularFireAuth, private router: Router,
              private authService: AuthService, private dataApiService: DataApiService,
              private notificationService: NotificationService, private afs:AngularFirestore
               ) {}
  public email: string;
  public password: string;
  nombre_completo : string;

  ngOnInit() {
  }

  onLogin(myForm: NgForm): void {
    if (myForm.valid === true) {
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
            myForm.resetForm();
             error => {
                  this.notificationService.showError(error.message, 'Error');
                  this.notificationService.showWarning(
                    'Esta funcionalidad no se encuentra disponible en este momento debido a problemas de conexión con el Servidor', 'Advertencia');
                }
             
              console.log('Bienvenido Tipo de Usuario Administrativo');
               this.nombre_completo = doc.payload.doc.data()['nombre'] + doc.payload.doc.data()['apellido']
               this.afs.collection(this.nombre_completo).add({
                'Email': this.email
               })
               console.log ('nombre completo', this.nombre_completo)
              this.notificationService.showSuccess('Bienvenido' + ' ' + doc.payload.doc.data()['nombre'], 'Notificación');
              this.router.navigate(['user/roles']);
           
          });
        }))
        .subscribe(exercices => {
        });
      }).catch(err => this.notificationService.showError('Usuario y/o contraseña incorrectos', 'Error'));
    } else {
      this.notificationService.showError('Revisa todos los Campos del Formulario', 'Error');
    }
    }

  

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['user/restaurante/restaurante']);
  }
}
