import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DataApiService } from './../../../services/data-api.service';


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
  usuario = []; // Se declara el arreglo para tener la informacion del usuario

  ngOnInit() {
  }

  onLogin(): void {
    this.usuario = [];
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.dataApiService.searchUserForEmail(this.email).subscribe((datausuarios)=>{
          datausuarios.forEach((usuario: any) => {
            this.usuario.push({
              id: usuario.payload.doc.id,
              data: usuario.payload.doc.data()
            });
          });
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
