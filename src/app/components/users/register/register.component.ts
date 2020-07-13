import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Usuarios } from './../../../domain/usuarios';
import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { DataApiService } from './../../../services/data-api.service';
import { NotificationService } from './../../../services/notification/notification.service';
import {NgForm} from '@Angular/forms';
import { snapshotChanges } from '@angular/fire/database';
import { FsService } from 'src/app/services/fs.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuarios: Usuarios;
  public password: string;

  constructor(private router: Router, private authService: AuthService,
    public usuariosService: UsuariosService, private dataApiServive: DataApiService,
    private notificationService: NotificationService) { }
  tipoUsuario = 1;

  ngOnInit() {
    this.usuarios = new Usuarios('', '', 0, '', '', this.tipoUsuario);
  }

  onAddUser(myForm: NgForm) {
    if (myForm.valid == true ) {
      this.usuarios.contraseña = this.password;
      this.usuarios.idtipousuario_Tipousuario = this.tipoUsuario;
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
              myForm.resetForm();
              this.notificationService.showSuccess('Usuario Registrado Correctamente', 'Notificación');
            
              })
            //this.onLoginRedirect();
          }).catch(err => this.notificationService.showError('el email ya se encuentra en uso', 'Error'));
       error => {
        this.notificationService.showError(error.message, 'Error');
      };
    } else {
      this.notificationService.showError('Revisa todos los Campos del Formulario', 'Error');

      
      
    }
  }

  

  

  


}
