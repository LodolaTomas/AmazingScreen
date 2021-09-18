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
  edit_monitor:Monitor;

  constructor(private authSvc: FirebaseService) {
    this.producto = authSvc.getAllProducts()
  }
  
  ngOnInit(): void {
  }

  logOut(): void {
    this.authSvc.logout()
  }

  editarMonitor(item:Monitor){
    this.edit_monitor=new Monitor('',item.nombre,item.modelo,'',item.tamanio,item.hertz,item.tiempoRespuesta,item.panel,item.resolucion,item.gsync,item.freeSync,item.tipo);
  }

  updateMonitor(){
    this.authSvc.updateMonitor(this.edit_monitor);
  }

  deleteMonitor(item:Monitor){
    this.authSvc.deleteProduct(item)
  }

}
