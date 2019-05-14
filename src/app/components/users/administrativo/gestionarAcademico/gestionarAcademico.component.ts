import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-gestionarAcademico',
  templateUrl: './gestionarAcademico.component.html',
  styleUrls: ['./gestionarAcademico.component.css']
})
export class gestionarAcademicoComponent implements OnInit{
  public turnos = [];
  public Email;
  constructor(public _fsService:FsService, private authService:AuthService, private dataApi: DataApiService) { }

    ngOnInit(){
      this._fsService.getTurnosAcademico().subscribe((turnosSnapshot)=>{
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
      
      
        this.dataApi.searchAcademicoForEmail(id)
          .pipe(map(docArray => {
            return docArray.map(doc => { 
              var  id = doc.payload.doc.id  
              
              this._fsService.deleteTurnoAcademicoToken(id).then(()=>{
                console.log("Entro eliminar");
                console.log(id);
              },(error) =>{
                console.error(error);
              });
            });
          }))
          .subscribe(exercices => {
          });
        this._fsService.deleteTurnoAcademico(TurnoId).then(()=>{
          console.log('Documento Eliminado');
          console.log("Turnos" + "/" + TurnoId);
        },(error) =>{
          console.error(error);
        }); 
  
    
}

}

