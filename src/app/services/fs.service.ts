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
<<<<<<< HEAD
  //Obtiene un turno 
=======
  //Obtiene un turno
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100
  public getTurno(TurnoId:string){
    return this.afs.collection('TurnosCaja').doc(TurnoId).snapshotChanges();

  }
   //Borrar turno
   public deleteTurnoCaja(TurnoId){
<<<<<<< HEAD
    return this.afs.doc(`TurnosCaja/${TurnoId}`).delete(); 

  }
  public deleteTurnoFinanciero(TurnoId){
    return this.afs.doc(`TurnosFinanciero/${TurnoId}`).delete(); 

  }
  public deleteTurnoAcademico(TurnoId){
    return this.afs.doc(`TurnosAcademico/${TurnoId}`).delete(); 

  }
  //Obtener los token Academicos
  public getTokensAcademicos(){
    return this.afs.collection('TurnosAcademico_Tokens').snapshotChanges();
  }
  public deleteTurnoCajaToken(id){
    return this.afs.doc(`TurnosCaja_Tokens/${id}`).delete();
  }

  public deleteTurnoAcademicoToken(id){
    return this.afs.doc(`TurnosAcademico_Tokens/${id}`).delete();
  }
  public deleteTurnoFinancieroToken(id){
    return this.afs.doc(`TurnosFinanciero_Tokens/${id}`).delete();
  }
  
  
=======
    return this.afs.doc(`TurnosCaja/${TurnoId}`).delete();

  }
  public deleteTurnoFinanciero(TurnoId){
    return this.afs.doc(`TurnosFinanciero/${TurnoId}`).delete();

  }
  public deleteTurnoAcademico(TurnoId){
    return this.afs.doc(`TurnosAcademico/${TurnoId}`).delete();

  }
>>>>>>> 234193b4b0f5706a666eb64ac21905e229a58100



}
