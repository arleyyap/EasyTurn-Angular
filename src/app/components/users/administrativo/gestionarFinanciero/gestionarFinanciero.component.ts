import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';

=======
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100



@Component({
    selector: 'app-gestionarFinanciero',
  templateUrl: './gestionarFinanciero.component.html',
  styleUrls: ['./gestionarFinanciero.component.css']
})
export class gestionarFinancieroComponent implements OnInit{
  public turnos = [];
<<<<<<< HEAD
  public Email;

  constructor(public _fsService:FsService,private authService:AuthService , private dataApi:DataApiService) { }

=======
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100

  constructor(public _fsService:FsService) { }

<<<<<<< HEAD
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
=======
    ngOnInit(){
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100

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
    atendido(TurnoId){
      this._fsService.deleteTurnoFinanciero(TurnoId).then(()=>{
        console.log('Documento Eliminado');
        console.log("Turnos" + "/" + TurnoId);
      },(error) =>{
        console.error(error);
      });

     }
}
