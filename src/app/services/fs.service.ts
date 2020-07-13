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
  //Obtener turnos de cada profesor

  public getTurnosProfesor(nombre){
    return this.afs.collection(nombre , ref => ref.orderBy('Turno')).snapshotChanges();
  }



  //Obtener los turnos
  public getTurnosCaja(){
    return this.afs.collection('TurnosCaja', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getTurnosFinanciero(){
    return this.afs.collection('TurnosFinanciero', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getTurnosAcademico(){
    return this.afs.collection('TurnosAcademico', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getCalificacionTurnosAcademico(){
    return this.afs.collection('CalifiacionTurnoAcademico', ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getNumeroTurnosAcademico(){
    return this.afs.collection('TurnosAcademicos',ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getNumeroTurnosCaja(){
    return this.afs.collection('TurnosAcademicos',ref => ref.orderBy('Turno')).snapshotChanges();
  }
  public getNumeroFinanciero(){
    return this.afs.collection('TurnosAcademicos',ref => ref.orderBy('Turno')).snapshotChanges();
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

//Ingenierias
public getTurnosSistemas(){
  return this.afs.collection('TurnosIngSistemas', ref => ref.orderBy('Turno')).snapshotChanges();
}
public getTurnosMultimedia(){
  return this.afs.collection('TurnosIngMultimedia', ref => ref.orderBy('Turno')).snapshotChanges();
}
public getTurnosElectronica(){
  return this.afs.collection('TurnosIngElectronica', ref => ref.orderBy('Turno')).snapshotChanges();
}
public getTurnosIndustrial(){
  return this.afs.collection('TurnosIngIndustrial', ref => ref.orderBy('Turno')).snapshotChanges();
}
public getTurnosAgroindustrial(){
  return this.afs.collection('TurnosIngAgro', ref => ref.orderBy('Turno')).snapshotChanges();
}

//Delete turnos ingenierias
public deleteTurnoSistemas(TurnoId){
  return this.afs.doc(`TurnosIngSistemas/${TurnoId}`).delete();
}
public deleteTurnoMultimedia(TurnoId){
  return this.afs.doc(`TurnosIngMultimedia/${TurnoId}`).delete();
}
public deleteTurnoElectronica(TurnoId){
  return this.afs.doc(`TurnosIngElectronica/${TurnoId}`).delete();
}
public deleteTurnoIndustrial(TurnoId){
  return this.afs.doc(`TurnosIngIndustrial/${TurnoId}`).delete();
}
public deleteTurnoAgro(TurnoId){
  return this.afs.doc(`TurnosIngAgro/${TurnoId}`).delete();
}

//Delete turnos ingenierias token
public deleteTurnoSistemasToken(id){
  return this.afs.doc(`TurnosIngSistemas_Tokens/${id}`).delete();
}
public deleteTurnoMultimediaToken(id){
  return this.afs.doc(`TurnosIngMultimedia_Tokens/${id}`).delete();
}
public deleteTurnoElectronicaToken(id){
  return this.afs.doc(`TurnosIngElectronica_Tokens/${id}`).delete();
}
public deleteTurnoIndustrialToken(id){
  return this.afs.doc(`TurnosIngIndustrial_Tokens/${id}`).delete();
}
public deleteTurnoAgroindustrialToken(id){
  return this.afs.doc(`TurnosIngAgro_Tokens/${id}`).delete();
}


//Creacion coleccion en firebase


}
