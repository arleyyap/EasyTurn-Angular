import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class mensajeComponent implements OnInit {
  public turnos = [];
    constructor(public fsService: FsService, public _MessageService: MessageService, private notificationService: NotificationService) {
   }

   ngOnInit() {
    this.fsService.getTurnosMultimedia().subscribe((turnosSnapshot) => {
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
    contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
    this.notificationService.showSuccess('Formulario de contacto', 'Mensaje enviado correctamente');
    });
    } 
   }