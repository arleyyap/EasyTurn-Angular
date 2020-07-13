import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestionarAgroindustrial',
  templateUrl: './gestionarAgroindustrial.component.html',
  styleUrls: ['./gestionarAgroindustrial.component.css']
})
export class gestionarAgroindustrialComponent implements OnInit {
  public turnos = [];
  public Email: any;
  constructor(private location: Location,private router:Router, public fsService: FsService, private authService: AuthService, private dataApi: DataApiService) { }

  ngOnInit() {
    this.fsService.getTurnosAgroindustrial().subscribe((turnosSnapshot) => {
      this.turnos = [];
      turnosSnapshot.forEach((turnoData: any) => {
        this.turnos.push({
          id: turnoData.payload.doc.id,
          data: turnoData.payload.doc.data()
        });
      });
    });
    
    console.log(this.turnos)
  }

  DeleteToken(email: string, TurnoId: string) {
    this.dataApi.searchAgroindustrialForEmail(email)
      .pipe(map(docArray => {
        return docArray.map(doc => {
          let id = doc.payload.doc.id;
          this.fsService.deleteTurnoAgroindustrialToken(id).then(() => {
            console.log('Entro eliminar');
            console.log(id);
          }, (error) => {
            console.error(error);
          });
        });
      }))
      .subscribe(exercices => {
      });
    this.fsService.deleteTurnoAgro(TurnoId).then(() => {
      console.log('Documento Eliminado');
      console.log('Turnos' + '/' + TurnoId);
    }, (error) => {
      console.error(error);
    });


  }
}
