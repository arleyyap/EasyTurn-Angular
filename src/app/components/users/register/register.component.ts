import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Usuarios } from './../../../domain/usuarios';
import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { DataApiService } from './../../../services/data-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuarios: Usuarios;
  public password: string;

  constructor(private router:Router, private authService:AuthService,
     public usuariosService: UsuariosService, private dataApiServive: DataApiService) { }
  tipoUsuario = 1;

  ngOnInit() {
    this.usuarios = new Usuarios("","",0,"","",this.tipoUsuario);
  }

  onAddUser() {
    console.log('password', this.password);
    console.log('Tipo_Usuario', this.tipoUsuario);
    this.usuarios.contraseña = this.password;
    console.log('Usuarios', this.usuarios);
    console.log('Usuarios', this.usuarios.email);
    this.usuariosService.save(this.usuarios).subscribe(resultado => {
      console.log('Se registro el usuario con exito');
    }, error => {
      console.log('Error', error);
    });
    const data = {
      apellido: this.usuarios.apellido,
      contraseña: this.usuarios.contraseña,
      email: this.usuarios.email,
      nombre: this.usuarios.nombre,
      telefono: this.usuarios.telefono,
      tipoUsuario: this.usuarios.idtipousuario_Tipousuario
    }
    this.authService.registerUser(this.usuarios.email, this.password)
    .then((res) => {
      this.dataApiServive.createUsuarios(data).then(() => {
        console.log('Usuario Registrado Correctamente');
      }).catch(err => console.log('err', err.message ));
      this.onLoginRedirect();
    }).catch(  err => console.log('err', err.message));
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
