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

  foto1: File;
  userForm: FormGroup;
  producto:Array<any>=[];

  filterPost='';
  
  /* editar */
  edit_monitor:Monitor;

  constructor(private authSvc: FirebaseService, private fb: FormBuilder,private data:BuscadorService) {
    this.initFormEspecialista();
    this.producto = authSvc.getAllProducts()
  }
  

  private initFormEspecialista(): void {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      modelo: ['', Validators.required],
      tamanio: ['', Validators.required],
      hertz: ['', Validators.required],
      tiempoRespuesta: ['', Validators.required],
      panel: ['', Validators.required],
      resolucion: ['', Validators.required],
      gsync: ['', Validators.required],
      foto: ['', Validators.required],
    });
  }

  async onRegister() {
    let monitor: Monitor = new Monitor(
      '100',
      this.userForm.value.nombre,
      this.userForm.value.modelo,
      this.foto1,
      this.userForm.value.tamanio,
      this.userForm.value.hertz,
      this.userForm.value.tiempoRespuesta,
      this.userForm.value.panel,
      this.userForm.value.resolucion,
      this.userForm.value.gsync,
    );
    
    this.authSvc.createMonitor(monitor)
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authSvc.logout()
  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

  editarMonitor(item:Monitor){
    this.edit_monitor=new Monitor('',item.nombre,item.modelo,'',item.tamanio,item.hertz,item.tiempoRespuesta,item.panel,item.resolucion,item.gsync);
  }

  updateMonitor(){
    console.log(this.edit_monitor)
    this.authSvc.updateMonitor(this.edit_monitor);
  }

}
