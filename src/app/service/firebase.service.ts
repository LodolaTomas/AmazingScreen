import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseApp = initializeApp(environment.firebaseConfig);
  auth = getAuth(this.firebaseApp);
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router:Router) { }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  doLogin(correo: string, password: string): Promise<Boolean> {
    return signInWithEmailAndPassword(this.auth, correo, password)
      .then((userCredential) => {
        onAuthStateChanged(this.auth,user => {console.log(user.displayName)});
        localStorage.setItem('token',userCredential.user.uid)
        this.loggedIn.next(true);
        /* this.writeUserData(userCredential.user.uid,userCredential.user.email) */
        
        return true
      })
      .catch((error) => {
        console.log(error.code)
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

  /* writeUserData(userId, email) {
    const db = getDatabase();
    set(ref(db, 'productos/' + userId), {
      uid: userId,
      email: email,
    });
  } */

  logout(): void {
    signOut(this.auth).then(() => {
      this.loggedIn.next(false);
      this.router.navigateByUrl('')
    })
  }

  doRegister(): Promise<Boolean> {
    return createUserWithEmailAndPassword(this.auth, 'correo', 'pass')
      .then((userCredential) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
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

}
