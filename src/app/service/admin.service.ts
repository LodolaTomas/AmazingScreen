import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {

   }

   getAllCities(): Observable<any[]>{
     return this.http.get<any[]>('https://amazingscreens-c83f7-default-rtdb.firebaseio.com/.json');
   }

}
