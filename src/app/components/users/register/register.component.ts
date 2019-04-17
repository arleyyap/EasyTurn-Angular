import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }
  public email:string = '';
  public password: string = '';

  ngOnInit() {
  }

  onAddUser(){
    console.log('email',this.email);
    console.log('password',this.password);
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['users/prueba']);
    }).catch(  err =>console.log('err', err.message));
  }

}
