import { Component, OnInit } from '@angular/core';
import { FsService} from 'src/app/services/fs.service';



@Component({
    selector: 'app-gestionarFinanciero',
  templateUrl: './gestionarFinanciero.component.html',
  styleUrls: ['./gestionarFinanciero.component.css']
})
export class gestionarFinancieroComponent implements OnInit{
  public turnos = [];

  constructor(public _fsService:FsService) { }

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
    atendido(TurnoId){
      this._fsService.deleteTurnoFinanciero(TurnoId).then(()=>{
        console.log('Documento Eliminado');
        console.log("Turnos" + "/" + TurnoId);
      },(error) =>{
        console.error(error);
      });

     }
}
