import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';
@Component({
    selector: 'app-gestionarCaja',
  templateUrl: './gestionarCaja.component.html',
  styleUrls: ['./gestionarCaja.component.css'],
})
export class gestionarCajaComponent implements OnInit{

  public turnos = [];

  

  constructor(public _fsService:FsService) {

    
   }
   

    ngOnInit(){
      this._fsService.getTurnos().subscribe((turnosSnapshot)=>{
        this._fsService
        this.turnos = [];
        turnosSnapshot.forEach((turnoData: any)=>{
          this.turnos.push({
            id: turnoData.payload.doc.id,
            data: turnoData.payload.doc.data()
          });
        });
      });
      

   }
   atendido(id:string){
     this._fsService.deleteTurno(id);


     console.log("Atendido");
   }

  
  
   



    
     

      




    
    
}



