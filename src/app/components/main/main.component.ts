import { Component, Input, OnInit } from '@angular/core';
import { BuscadorService } from 'src/app/service/buscador.service';
import { FirebaseService } from 'src/app/service/firebase.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cosas:Array<any>=[];
  message:string='';
  constructor(public search:BuscadorService,private firebaseSrv:FirebaseService) {
    this.cosas= firebaseSrv.getAllProducts();
  }
  ngOnInit(): void {
    this.search.currentMessage.subscribe(mensaje=>{
      if(mensaje!=''){
        this.setMessage(mensaje)
      }
    })
  }

  setMessage(mensaje:any){
    this.message=mensaje;
  }

}
