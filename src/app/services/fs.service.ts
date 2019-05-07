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
  public getTurnosCaja(){
    return this.afs.collection('TurnosCaja').snapshotChanges();
  }
  public getTurnosFinanciero(){
    return this.afs.collection('TurnosFinanciero').snapshotChanges();
  }
  public getTurnosAcademico(){
    return this.afs.collection('TurnosAcademico').snapshotChanges();
  }
  //Obtiene un turno
  public getTurno(TurnoId:string){
    return this.afs.collection('TurnosCaja').doc(TurnoId).snapshotChanges();

  }
   //Borrar turno
   public deleteTurnoCaja(TurnoId){
    return this.afs.doc(`TurnosCaja/${TurnoId}`).delete();

  }
  public deleteTurnoFinanciero(TurnoId){
    return this.afs.doc(`TurnosFinanciero/${TurnoId}`).delete();

  }
  public deleteTurnoAcademico(TurnoId){
    return this.afs.doc(`TurnosAcademico/${TurnoId}`).delete();

  }



}
