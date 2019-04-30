import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { }
  /**
   * Crear un Nuevo Usuario
   */
  public createUsuarios(data: {apellido: string, contraseña: string, email: string,
     nombre: string, telefono: string, tipoUsuario: string}) {
       return this.afs.collection('usuarios').add(data);
  }
}
