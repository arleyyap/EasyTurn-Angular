import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-turno-restaurante',
  templateUrl: './turno-restaurante.component.html',
  styleUrls: ['./turno-restaurante.component.css']
})
export class TurnoRestauranteComponent implements OnInit {
  public turnos = [];
  public email:string;

  constructor(public fsService: FsService, private dataApi: DataApiService, private auth:AuthService) { }

  ngOnInit() {
    this.auth.isAuth().subscribe(user =>{
      this.email= user.email.toString();
      console.log("este email es el que entrara"+ this.email)
      this.fsService.getTurnosRestaurante(this.email).subscribe((turnosSnapshot)=>{
        console.log('Entroo',this.email)
        this.turnos=[];
        turnosSnapshot.forEach((turnoData:any)=>{
          this.turnos.push({
            id:turnoData.payload.doc.id,
            data: turnoData.payload.doc.data()
  
          });
        });
      });
      
    
    
    });
  
  }

 
  }


