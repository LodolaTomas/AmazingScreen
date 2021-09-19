import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  garantia:any;
  politicas:any;
  quienesSomos:any;
  terminos:any;
  info:Array<string>=[];
  constructor(private firebaseSrv:FirebaseService) {
    this.info=firebaseSrv.getInfo();
   }

  ngOnInit(): void {
  }

}
