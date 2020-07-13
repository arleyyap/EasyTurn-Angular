import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TipoAdmin} from './../../../../domain/tipo-admin';
import {TipoAdminService} from './../../../../services/tipoAdmin/tipo-admin.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from './../../../../services/auth.service';



@Component({
    selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  public administradores : TipoAdmin
  public usuarios: Usuarios

  constructor(private router: Router, public tipoAdminService: TipoAdminService,
    private authService: AuthService) { }

    ngOnInit(){
      console.log('Esta es la variable local Administrativo', localStorage.getItem('tipoUsuario'));
      this.administradores = new TipoAdmin(1,'',1);
      this.authService.isAuth().subscribe(user =>{
        this.administradores.email_Usuarios= user.email.toString();
      });
      console.log('Email' , this.administradores)
    }
}




