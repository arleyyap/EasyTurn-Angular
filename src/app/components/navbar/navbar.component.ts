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
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        if (Number(this.local) === 1) {
          this.isLoggedRestaurante = true;
        }
        if (Number(this.local) === 2) {
          this.isLoggedAdministrativo = true;
        }
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
        this.isLoggedRestaurante = true;
        this.isLoggedAdministrativo = true;
      }
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
    localStorage.removeItem('tipoUsuario');
  }
}
