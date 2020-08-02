import { Component, OnInit } from '@angular/core';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    users:Array<any>=[];
  constructor(private firestore: AngularFirestore) { 
    this.getUsers();

  }

  ngOnInit() {
  }

  getUsers(){
    this.firestore.firestore.collection('usuarios').onSnapshot(snap=>{
      var filter = snap.docs.filter(doc=> (doc.data().tipoUsuario == 'asesor' || doc.data().tipoUsuario == 'profesor' ||doc.data().tipoUsuario == 'admin'));
      this.users = filter;
    })
  }

  changeUserState(user,state){
    user.ref.update({ 'habilitado': state });
  }
}
