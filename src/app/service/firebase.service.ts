import { Injectable, OnInit } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Monitor } from '../class/monitor';
import { AngularFirestore } from '@angular/fire/firestore/';
import { AngularFireStorage } from '@angular/fire/storage';
import { Notebook } from '../class/notebook';
import { PlacaVideo } from '../class/placaVideo';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  uploadPercent: Observable<any>;
  userRef: AngularFireList<any> = null;
  myAdmin: any;
  arrayProducts:Array<any>=[];
  constructor(private router: Router, public fireAuth: AngularFireAuth, private http: HttpClient, private storage: AngularFireStorage,
    private db: AngularFireDatabase, private ds: AngularFirestore, private authAF: AngularFireAuth) {

    this.userRef = this.db.list('/productos');
    this.userRef.snapshotChanges().subscribe(data=>{
      data.forEach(element=>{
        if(element.payload.val().alta==true){
          this.arrayProducts.push(element.payload.val())
        }
      })
    })
  }

  GetCurrentUser() {
    return this.authAF.currentUser;
  }

  getAllProducts(): Array<any> {
    return this.arrayProducts;
  }

  async getUser() {
    let respon = await new Promise(resolve => {
      this.userRef.snapshotChanges().subscribe(data => {
        resolve(data[0].key);
      });
    })
    console.log(respon)
    this.myAdmin = respon
  }

  verifyAdmin(key: string): boolean {
    console.log(this.myAdmin)
    if (key === this.myAdmin) {
      return true;
    }
    return false;
  }

  doLogin(correo: string, password: string): Promise<Boolean> {
    return this.fireAuth.signInWithEmailAndPassword(correo, password)
      .then((userCredential) => {
        localStorage.setItem('token', userCredential.user.uid)
        this.loggedIn.next(true);
        return true
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            this.alert('error', "email invalido");
            break;
          case "auth/wrong-password":
            this.alert('error', "clave invalida");
            break;
          case "auth/too-many-requests":
            this.alert('error', "A realizados demaciados intentos")
        }
        return false
      });
  }

  logout(): void {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token')
      this.loggedIn.next(false);
      this.router.navigateByUrl('')
    })
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icon,
      title: text,
    });
  }

  createMonitor(product: Monitor) {
    try {
      let ref = this.db.database.ref("/productos/");
      let uid = this.ds.createId();
      product.uid = uid;
      let storageRef = this.storage.ref(`/${uid}/${product.foto.name}`);
      const task = this.storage.upload(`/${uid}/${product.foto.name}`, product.foto).then(() => {
        storageRef.getDownloadURL().toPromise().then(url => {
          product.foto = url;
          ref.child(`${uid}`).set({uid:product.uid,foto:product.foto, nombre:`${product.nombre} ${product.modelo}`, alta:true, tipo:product.tipo,
          descripcion:` Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion} | G-Sync:${product.gsync?'si':'no'} | tiempo Respuesta:${product.tiempoRespuesta} | Panel:${product.panel}`});
        });
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateMonitor(product: Monitor) {
    this.userRef.snapshotChanges().subscribe(element=>{
      element.forEach(data=>{
        console.log(data.payload.val())
        if(data.payload.val().uid==product.uid){
            product.foto=data.payload.val().foto;
            this.userRef.update(product.uid,{alta:true,nombre:`${product.nombre} ${product.modelo}`, tipo:product.tipo,
            descripcion:` Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion} | G-Sync:${product.gsync?'si':'no'} | FreeSync:${product.freeSync?'si':'no'} | tiempo Respuesta:${product.tiempoRespuesta} | Panel:${product.panel}`})
        }
      })
    })
  }

  createNetbook(product: Notebook) {
    try {
      let ref = this.db.database.ref("/productos/");
      let uid = this.ds.createId();
      product.uid = uid;
      let storageRef = this.storage.ref(`/${uid}/${product.foto.name}`);
      const task = this.storage.upload(`/${uid}/${product.foto.name}`, product.foto).then(() => {
        storageRef.getDownloadURL().toPromise().then(url => {
          product.foto = url;
          ref.child(`${uid}`).set({uid:product.uid,foto:product.foto, nombre:`${product.nombre} ${product.modelo}`, alta:true, tipo:product.tipo,
          descripcion:`Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion} | Procesador: ${product.procesador} | Placa de video:${product.placadeVideo} | RAM:${product.RAM} | Capacidad:${product.capacidad} | Panel:${product.panel} | tiempo Respuesta:${product.tiempoRespuesta}`});
        });
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateNetbook(product: Notebook) {
    this.userRef.snapshotChanges().subscribe(element=>{
      element.forEach(data=>{
        console.log(data.payload.val())
        if(data.payload.val().uid==product.uid){
            product.foto=data.payload.val().foto;
            this.userRef.update(product.uid,{alta:true,nombre:`${product.nombre} ${product.modelo}`, tipo:product.tipo,
            descripcion:`Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion} | Procesador: ${product.procesador} | Placa de video:${product.placadeVideo} | RAM:${product.RAM} | Capacidad:${product.capacidad} | Panel:${product.panel} | tiempo Respuesta:${product.tiempoRespuesta}`})
        }
      })
    })
  }

  createPlacaVideo(product: PlacaVideo) {
    try {
      let ref = this.db.database.ref("/productos/");
      let uid = this.ds.createId();
      product.uid = uid;
      let storageRef = this.storage.ref(`/${uid}/${product.foto.name}`);
      const task = this.storage.upload(`/${uid}/${product.foto.name}`, product.foto).then(() => {
        storageRef.getDownloadURL().toPromise().then(url => {
          product.foto = url;
          ref.child(`${uid}`).set({uid:product.uid,foto:product.foto, nombre:`${product.nombre} ${product.modelo}`, alta:true, tipo:product.tipo,
          descripcion:`RAM:${product.RAM}`});
        });
      })
    } catch (error) {
      console.log(error)
    }
  }

  updatePlacaVideo(product: PlacaVideo) {
    this.userRef.snapshotChanges().subscribe(element=>{
      element.forEach(data=>{
        console.log(data.payload.val())
        if(data.payload.val().uid==product.uid){
            product.foto=data.payload.val().foto;
            this.userRef.update(product.uid,{alta:true,nombre:`${product.nombre} ${product.modelo}`, tipo:product.tipo,
            descripcion:`RAM:${product.RAM}`})
        }
      })
    })
  }

  deleteProduct(product:any){
    this.userRef.update(product.uid,{alta:false})
  }

}
