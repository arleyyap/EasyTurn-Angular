import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name: string = 'Easy Turn';
  public isLogged: boolean = false;
  public isLoggedRestaurante = false;
  public isLoggedAdministrativo = false;
  public local = localStorage.getItem('tipoUsuario');

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    console.log('Este es el tipo de Usuario que entra',this.local)
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        if (Number(this.local) === 1) {
          console.log('Entro restaurante',1)
          this.isLoggedRestaurante = true;
        }
        if (Number(this.local) === 2) {
          console.log('Entro a administrativo',this.local);
          this.isLoggedAdministrativo = true;
        }
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
        this.isLoggedRestaurante = false;
        this.isLoggedAdministrativo = false;
      }
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
    this.local = '';
  }
}
