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
  productRef: AngularFireList<any> = null;
  footerRef: AngularFireList<any> = null;
  myAdmin: any;
  footer: Array<any> = [];
  arrayProducts: Array<any> = [];
  constructor(private router: Router, public fireAuth: AngularFireAuth, private storage: AngularFireStorage,
    private db: AngularFireDatabase, private ds: AngularFirestore, private authAF: AngularFireAuth) {

    this.productRef = this.db.list('/productos');
    this.productRef.snapshotChanges().subscribe(data => {
      this.arrayProducts.splice(0, this.arrayProducts.length);
      data.forEach(element => {
        this.arrayProducts.push(element.payload.val())
      })
    })
    this.footerRef = this.db.list('/footer');
    this.footerRef.snapshotChanges().subscribe(data => {
      data.forEach(element => {
        this.footer.push(element.payload.val())
      })
    })
  }

  getInfo() {
    return this.footer
  }

  GetCurrentUser() {
    return this.authAF.currentUser;
  }

  getAllProducts(): Array<any> {
    return this.arrayProducts;
  }

  async getUser() {
    let respon = await new Promise(resolve => {
      this.productRef.snapshotChanges().subscribe(data => {
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
      /* this.fireAuth.createUserWithEmailAndPassword(correo,password).then((userCredential)=>{
        return true;
      }); */
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

  createMonitor(product: Monitor): Promise<boolean> {
    return new Promise(resolve => {
      try {
        let ref = this.db.database.ref("/productos/");
        let uid = this.ds.createId();
        product.uid = uid;
        let storageRef = this.storage.ref(`/${product.foto.name}${product.modelo}`);
        const task = this.storage.upload(`/${product.foto.name}${product.modelo}`, product.foto).then(() => {
          storageRef.getDownloadURL().toPromise().then(url => {
            product.foto = url;
            ref.child(`${uid}`).set({
              "uid": product.uid, "foto": product.foto, "nombre": `${product.nombre} ${product.modelo}`, "alta": true, "tipo": product.tipo,
              "descripcion": ` Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion}  ${product.gsync ? '| G-Sync |' : '|'}  tiempo Respuesta:${product.tiempoRespuesta} | Panel:${product.panel}`
            });
            resolve(true)
          });
        })
      } catch (error) {
        console.log(error)
      }
    })
  }

  updateMonitor(product: any): Promise<boolean> {
    return new Promise(resolve => {
      this.productRef.snapshotChanges().subscribe(element => {
        element.forEach(data => {
          if (data.payload.val().uid == product.uid) {
            product.foto = data.payload.val().foto;
            this.productRef.update(product.uid, {
              alta: true, nombre: `${product.nombre}`, tipo: product.tipo,
              descripcion: product.descripcion
            })
            resolve(true);
          }
        })
      })
    })
  }

  updateInfo(key: string, cambio: any) {
    let ref = this.db.database.ref(`/footer`);
    ref.child(key).set(cambio);
  }

  createNetbook(product: Notebook): Promise<boolean> {
    return new Promise(resolve => {
      try {
        let ref = this.db.database.ref("/productos/");
        let uid = this.ds.createId();
        product.uid = uid;
        let storageRef = this.storage.ref(`/${uid}/${product.foto.name}`);
        const task = this.storage.upload(`/${uid}/${product.foto.name}`, product.foto).then(() => {
          storageRef.getDownloadURL().toPromise().then(url => {
            product.foto = url;
            ref.child(`${uid}`).set({
              uid: product.uid, foto: product.foto, nombre: `${product.nombre} ${product.modelo}`, alta: true, tipo: product.tipo,
              descripcion: `Tamaño:${product.tamanio} | Hertz:${product.hertz} | Resolucion:${product.resolucion} | Procesador: ${product.procesador} | Placa de video:${product.placadeVideo} | RAM:${product.RAM} | Capacidad:${product.capacidad} | Panel:${product.panel} | tiempo Respuesta:${product.tiempoRespuesta}`
            });
            resolve(true)
          });
        })
      } catch (error) {
        console.log(error)
      }
    })

  }

  updateNetbook(product: any): Promise<boolean> {
    return new Promise(resolve => {
      this.productRef.snapshotChanges().subscribe(element => {
        element.forEach(data => {
          console.log(data.payload.val())
          if (data.payload.val().uid == product.uid) {
            product.foto = data.payload.val().foto;
            this.productRef.update(product.uid, {
              alta: true, nombre: `${product.nombre}`, tipo: product.tipo,
              descripcion: product.descripcion
            })
            resolve(true)
          }
        })
      })
    })
  }

  createPlacaVideo(product: PlacaVideo): Promise<boolean> {
    return new Promise(resolve => {
      try {
        let ref = this.db.database.ref("/productos/");
        let uid = this.ds.createId();
        product.uid = uid;
        let storageRef = this.storage.ref(`/${uid}/${product.foto.name}`);
        const task = this.storage.upload(`/${uid}/${product.foto.name}`, product.foto).then(() => {
          storageRef.getDownloadURL().toPromise().then(url => {
            product.foto = url;
            ref.child(`${uid}`).set({
              uid: product.uid, foto: product.foto, nombre: `${product.nombre} ${product.modelo}`, alta: true, tipo: product.tipo,
              descripcion: `RAM:${product.RAM}`
            });
            resolve(true);
          });
        })
      } catch (error) {
        console.log(error)
      }
    })
  }

  updatePlacaVideo(product: any): Promise<boolean> {
    return new Promise(resolve => {
      this.productRef.snapshotChanges().subscribe(element => {
        element.forEach(data => {
          console.log(data.payload.val())
          if (data.payload.val().uid == product.uid) {
            product.foto = data.payload.val().foto;
            this.productRef.update(product.uid, {
              alta: true, nombre: `${product.nombre}`, tipo: product.tipo,
              descripcion: product.descripcion
            });
            resolve(true)
          }
        })
      })
    })
  }

  deleteProduct(product: any) {
    this.productRef.update(product.uid, { alta: false })
  }

}
