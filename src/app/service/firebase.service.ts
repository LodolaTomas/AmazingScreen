import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.prod';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
  doLogin(): Promise<Boolean> {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, 'correo', 'pass')
      .then((userCredential) => {
        return true
      })
      .catch((error) => {
        return false
      });
 }
}
