import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Usuarios } from './../../../domain/usuarios';
import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { DataApiService } from './../../../services/data-api.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuarios: Usuarios;
  public password: string;

  constructor(private router:Router, private authService:AuthService,
              public usuariosService: UsuariosService, private dataApiServive: DataApiService,
              private notificationService: NotificationService) { }
  tipoUsuario = 1;

  ngOnInit() {
    this.usuarios = new Usuarios('', '', 0, '', '', this.tipoUsuario);
  }

  onAddUser() {
    this.usuarios.contraseña = this.password;
    this.usuarios.idtipousuario_Tipousuario = this.tipoUsuario;
    this.usuariosService.save(this.usuarios).subscribe(resultado => {
      console.log('Se registro el usuario con exito en Postgres');
      const data = {
        apellido: this.usuarios.apellido,
        contraseña: this.usuarios.contraseña,
        email: this.usuarios.email,
        nombre: this.usuarios.nombre,
        telefono: this.usuarios.telefono,
        tipoUsuario: Number(this.usuarios.idtipousuario_Tipousuario)
      };
      this.authService.registerUser(this.usuarios.email, this.password)
    .then((res) => {
      console.log('Se registro el usuario con exito en el Auth-Service');
      this.dataApiServive.createUsuarios(data).then(() => {
        console.log('Usuario Registrado Correctamente en el Database');
        this.notificationService.showSuccess('Usuario Registrado Correctamente', 'Notificación');
      }).catch(err => this.notificationService.showError(err.message, 'Error'));
      //this.onLoginRedirect();
    }).catch(  err => this.notificationService.showError(err.message, 'Error'));
    }, error => {
      this.notificationService.showError(error.message, 'Error');
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        console.log('resUser', res);
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['user/restaurante/restaurante']);
  }


}
