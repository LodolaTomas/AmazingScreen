import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginLocalGuard implements CanActivate {

  constructor(private authSvc: FirebaseService) {
  }

  canActivate(): boolean{
    if(this.authSvc.verifyAdmin(localStorage.getItem('token'))){
      console.log(this.authSvc.verifyAdmin(localStorage.getItem('token')))
      return true;
    }else{
      console.log(this.authSvc.verifyAdmin(localStorage.getItem('token')))
      return false;
    }
  }
  
}
