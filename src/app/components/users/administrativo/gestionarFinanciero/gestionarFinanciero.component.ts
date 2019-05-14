import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';




@Component({
    selector: 'app-gestionarFinanciero',
  templateUrl: './gestionarFinanciero.component.html',
  styleUrls: ['./gestionarFinanciero.component.css']
})
export class gestionarFinancieroComponent implements OnInit{
  public turnos = [];
  public Email;

  constructor(public _fsService:FsService,private authService:AuthService , private dataApi:DataApiService) { }


    ngOnInit(){

      this._fsService.getTurnosFinanciero().subscribe((turnosSnapshot)=>{
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
    DeleteToken(id, TurnoId){
     
      console.log("este es el id"+ id + "este es el turno" + TurnoId);
        this.dataApi.searchFinancieroForEmail(id)
          .pipe(map(docArray => {
            return docArray.map(doc => { 
              var  id = doc.payload.doc.id
            
              
              this._fsService.deleteTurnoFinancieroToken(id).then(()=>{
                console.log("Entro eliminar");
                console.log(id);
              },(error) =>{
                console.error(error);
              });
            });
          }))
          .subscribe(exercices => {
          });
        
        this._fsService.deleteTurnoFinanciero(TurnoId).then(()=>{
          console.log('Documento Eliminado');
          console.log("Turnos" + "/" + TurnoId);
        },(error) =>{
          console.error(error);
        }); 
  
      
      
  
    }
}



