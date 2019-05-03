import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DataApiService } from './../../../services/data-api.service';
import { Usuarios } from './../../../domain/usuarios';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';


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
              private authService: AuthService, private dataApiService: DataApiService) {}
  public email: string;
  public password: string;
  public usuarios: Usuarios;
  usuario = []; // Se declara el arreglo para tener la informacion del usuario


  ngOnInit() {
  }

  onLogin(): void {
    this.usuario = [];
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.dataApiService.searchUserForEmail(this.email)
        .pipe(map(docArray =>{
          return docArray.map(doc =>{
            console.log(doc);
            console.log(doc.payload.doc.data()['nombre']);
            const data = {
              id: doc.payload.doc.id,
              nombre: doc.payload.doc.data()['nombre'],
              apellido: doc.payload.doc.data()['apellido'],
              telefono: doc.payload.doc.data()['telefono'],
              email: doc.payload.doc.data()['email'],
              contrasena: doc.payload.doc.data()['contraseña'],
              tipoUsuario: doc.payload.doc.data()['tipoUsuario']
            }
            if (data.tipoUsuario == 1) {
              console.log('Bienvenido Tipo de Usuario Restaurante');
              this.router.navigate(['user/restaurante/restaurante']);
            }else if (data.tipoUsuario == 2){
              console.log('Bienvenido Tipo de Usuario Administrativo');
              this.router.navigate(['user/administrativo']);
            }else{
              console.log('TU NO PUEDES ENTRAR');
            }
          });
        }))
        .subscribe(exercices =>{

        });

        console.log(Object.keys(this.usuario));
        //this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
    console.log('Este es el usuairo', this.usuario);
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
