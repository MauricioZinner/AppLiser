import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {AngularFirestoreDocument, AngularFirestoreCollection,AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }


  // Guardar un documento en una coleccion
  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  // Crea un ID
  CreaId() {
       return this.database.createId();
  }

  // Extraer los documentos de una coleccion
  getCollection<tipo>(path: string) {
      const collection = this.database.collection<tipo>(path);
      return collection.valueChanges();
  }

  // Extraer el documento de una coleccion
  getDoc<tipo>(path: string, id: string) {
      const collection = this.database.collection<tipo>(path);
      return collection.doc(id).valueChanges();
  }

  //Hace una busqueda en base a condiciones
  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {

    console.log(path, parametro, condicion, busqueda)
    const collection = this.database.collection<tipo>(path,
          ref => ref.where( parametro, condicion, busqueda));
          return collection.valueChanges();
  }

}
