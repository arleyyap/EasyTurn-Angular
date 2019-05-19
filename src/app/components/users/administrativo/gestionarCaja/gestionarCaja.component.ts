import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gestionarCaja',
  templateUrl: './gestionarCaja.component.html',
  styleUrls: ['./gestionarCaja.component.css'],
})
export class gestionarCajaComponent implements OnInit {

  public turnos = [];
  public Email: any;

  constructor(public fsService: FsService, private authService: AuthService, private dataApi: DataApiService) {

  }
  ngOnInit() {
    this.fsService.getTurnosCaja().subscribe((turnosSnapshot) => {
      this.turnos = [];
      turnosSnapshot.forEach((turnoData: any) => {
        this.turnos.push({
          id: turnoData.payload.doc.id,
          data: turnoData.payload.doc.data()
        });
      });
    });
  }

  DeleteToken(email: string, TurnoId: string) {
    console.log('va a entrar' + 'este es el correo' + email + 'y el turno' + TurnoId);
    this.dataApi.searchCajaForEmail(email)
      .pipe(map(docArray => {
        return docArray.map(doc => {
          let id = doc.payload.doc.id;
          this.fsService.deleteTurnoCajaToken(id).then(() => {
            console.log('Entro eliminar');
            console.log(id);
          }, (error) => {
            console.error(error);
          });
        });
      }))
      .subscribe(exercices => {
      });

    this.fsService.deleteTurnoCaja(TurnoId).then(() => {
      console.log('Documento Eliminado');
      console.log('Turnos' + '/' + TurnoId);
    }, (error) => {
      console.error(error);
    });
  }
}
