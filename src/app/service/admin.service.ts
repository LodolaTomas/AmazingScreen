import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  uploadPercent: Observable<any>;

  constructor(private http: HttpClient, private storage: AngularFireStorage, private db:AngularFireDatabase) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('https://amazingscreens-c83f7-default-rtdb.firebaseio.com/productos.json');
  }





}
