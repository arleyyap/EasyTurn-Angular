import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
  }
  /**
   * En el Database de Firebase crear una nueva coleccion (Documento), creando un usuario con los campos de:
   * email, contraseña ,nombre, apellido, telefono y tipo Usuario
   */
  public createUsuarios(data: {
    apellido: string, contraseña: string, email: string,
    nombre: string, telefono: number, tipoUsuario: number
  }) {
    return this.afs.collection('usuarios').add(data);
  }

  public browseUsuario(documentId: string) {
    return this.afs.collection('usuarios').doc(documentId).snapshotChanges();
  }

  public buscarUsuario(email) {
    console.log('Este es el coreo que entra el metodo de data', email);

    return this.afs.collection('usuarios', ref => ref.where('email', "==", email)).snapshotChanges().subscribe((datausuarios) => {
      datausuarios.forEach((usuario: any) => {
        console.log('Data usuario', usuario.payload.doc.data());
      });
    }

    );
  }
}
