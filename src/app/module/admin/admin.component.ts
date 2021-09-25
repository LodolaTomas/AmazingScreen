import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Monitor } from 'src/app/class/monitor';
import { BuscadorService } from 'src/app/service/buscador.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  producto:Array<any>=[];
  filterPost='';
  /* editar */
  edit_monitor:any;
  info:Array<any>=[];

  garantia:string;
  privacidad:string;
  quienesSomos:string;
  terminosCondiciones:string
  constructor(private authSvc: FirebaseService) {
    console.log('ENTREE')
    this.producto = authSvc.getAllProducts();
    this.info=authSvc.getInfo();
  }
  
  ngOnInit(): void {
  }

  logOut(): void {
    this.authSvc.logout()
  }

  editarMonitor(item:any){
    this.edit_monitor=item;
  }

  updateMonitor(){
    this.authSvc.updateMonitor(this.edit_monitor);
  }

  deleteMonitor(item:Monitor){
    this.authSvc.deleteProduct(item)
  }

  updateInfo(key:string,cambio:any){
    this.authSvc.updateInfo(key,cambio);
  }
}
