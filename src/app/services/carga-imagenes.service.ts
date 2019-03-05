import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGES = 'img';

  constructor(private db: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.loading = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
            storageRef.child(`${this.CARPETA_IMAGES}/${item.fileName}`).put(item.archivo);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
                    item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
            console.log('File available at', downloadURL);
          item.url = downloadURL;
          item.loading = false;
          this.guardarImagen({
            nombre: item.fileName,
            url: item.url
          });
        });
      });
    }
  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGES}`).add(imagen);
  }
}
