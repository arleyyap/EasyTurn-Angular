import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  

  constructor(private afs:AngularFirestore) {
    console.log('Service CRUD On');
   }

  //Obtener los turnos
  public getTurnos(){
    return this.afs.collection('TurnosCaja').snapshotChanges();
  }
  //Obtiene un turno 
  public getTurno(TurnoId:string){
    return this.afs.collection('TurnosCaja').doc(TurnoId).snapshotChanges();

  }
   //Borrar turno
   public deleteTurno(TurnoId){
    return this.afs.doc(`TurnosCaja/${TurnoId}`).delete(); 

  }




}
