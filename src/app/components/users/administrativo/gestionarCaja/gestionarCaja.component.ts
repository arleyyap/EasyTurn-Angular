import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-gestionarCaja',
  templateUrl: './gestionarCaja.component.html',
  styleUrls: ['./gestionarCaja.component.css'],
})
export class gestionarCajaComponent implements OnInit{

  public turnos = [];

<<<<<<< HEAD
  public Email;
=======

>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100


  constructor(public _fsService:FsService,  private authService:AuthService , private dataApi:DataApiService) {


   }


    ngOnInit(){
      this._fsService.getTurnosCaja().subscribe((turnosSnapshot)=>{
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
<<<<<<< HEAD

   DeleteToken(id, TurnoId){
    
    console.log("va a entrar"+ "este es el id" + id + "y el turno"+ TurnoId);
      this.dataApi.searchCajaForEmail(id)
        .pipe(map(docArray => {
          return docArray.map(doc => { 
            var  id = doc.payload.doc.id
          
            
            this._fsService.deleteTurnoCajaToken(id).then(()=>{
              console.log("Entro eliminar");
              console.log(id);
            },(error) =>{
              console.error(error);
            });
          });
        }))
        .subscribe(exercices => {
        });
      
      this._fsService.deleteTurnoCaja(TurnoId).then(()=>{
        console.log('Documento Eliminado');
        console.log("Turnos" + "/" + TurnoId);
      },(error) =>{
        console.error(error);
      }); 

    
    

  }
  
=======
   atendido(TurnoId){
    this._fsService.deleteTurnoCaja(TurnoId).then(()=>{
      console.log('Documento Eliminado');
      console.log("Turnos" + "/" + TurnoId);
    },(error) =>{
      console.error(error);
    });

   }

   notificacion(){


   }
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100


















}



