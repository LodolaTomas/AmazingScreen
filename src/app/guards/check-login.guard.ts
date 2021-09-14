import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: FirebaseService,private router:Router) {

  }
  canActivate(): Observable<boolean> {
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => {
        if (!isLogged) {
          localStorage.getItem('token')
          
          this.router.navigateByUrl('');
          return false;
        }
        return true;
      })
    )
  }

}
