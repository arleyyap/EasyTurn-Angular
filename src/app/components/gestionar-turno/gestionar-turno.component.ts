import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
@Component({
  selector: 'app-gestionar-turno',
  templateUrl: './gestionar-turno.component.html',
  styleUrls: ['./gestionar-turno.component.css']
})
export class GestionarTurnoComponent implements OnInit {
  turnos: Array<any> = [];
  mailPicked: any; turnoPicked: any;
  @ViewChild('cuerpoMensaje') fondovalor: ElementRef;

  constructor(private firestore: AngularFirestore, private asfService: AuthService, private route: ActivatedRoute,
    private angularFireMessaging: AngularFireMessaging, private angularFireAuth: AngularFireAuth, private anm: AngularFireModule) {
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('token', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }


  ngOnInit() {
    this.getTurnos();
    //    this.requestPermission();
    this.prepareMessage();
  }

  getTurnos() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    console.log(firebase.firestore.Timestamp.fromDate(today));
    console.log(firebase.firestore.Timestamp.fromDate(tomorrow));
    this.asfService.getUser().then(user => {
      var caja = user.data().tipoUsuario == 'asesor' ?
        this.firestore.collection('secciones').doc('cajas').collection('subareas').doc(this.route.snapshot.params['id-caja']).ref :
        user.data().programa;
      this.firestore.firestore.collection('turnos')
        .where('caja', '==', caja)
        //        .where("fecha_atencion", '>=', firebase.firestore.Timestamp.fromDate(today))
        //      .where("fecha_atencion", '<', firebase.firestore.Timestamp.fromDate(tomorrow))
        .where("eliminado", '==', false).onSnapshot(querySnapshot => {
          this.turnos = querySnapshot.docs;
        });
    });

  }

  enviarCorreo() {
    const cuerpo = this.fondovalor.nativeElement.value;
    const mail = this.mailPicked;
    var addMessage = firebase.functions().httpsCallable('addMessage');
    addMessage({ email: mail.data().email, body: cuerpo });
  }
  callTurno() {
    this.turnoPicked.ref.update({ 'atendido': true });
    var pos = this.turnos.indexOf(this.turnoPicked);
    var messages = [];
    messages.push({
      "data": {
        "click_action": "FLUTTER_NOTIFICATION_CLICK",
        "caja": this.turnoPicked.data().caja.path,
        "ready": 'true',
      },
      "topic": this.turnoPicked.data().usuario.path.replace('usuarios/', ''),
      "notification": {
        "body": "Tu turno esta listo",
        "title": "El turno que esperabas se encuentra listo",
      },
    })
    for (var i = pos + 1; i < this.turnos.length && i <= pos + 3; i++) {
      messages.push({
        "data": {
          "click_action": "FLUTTER_NOTIFICATION_CLICK",
          "caja": this.turnos[i].data().caja.path,
          "ready":'false'
        },
        "topic": this.turnos[i].data().usuario.path.replace('usuarios/', ''),
        "notification": {
          "body": "Tu turno esta listo",
          "title": "El turno que esperabas se encuentra listo",
        },
      })
    }
    var sendNotification = firebase.functions().httpsCallable('sendNotification');
    sendNotification(messages);
  }

  prepareMessage() {


  }
}