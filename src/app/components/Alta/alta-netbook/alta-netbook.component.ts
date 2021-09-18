import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notebook } from 'src/app/class/notebook';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-alta-netbook',
  templateUrl: './alta-netbook.component.html',
  styleUrls: ['./alta-netbook.component.scss']
})
export class AltaNetbookComponent implements OnInit {

  userForm: FormGroup;
  foto1: File;
  constructor(private authSrv:FirebaseService, private fb: FormBuilder) { 
    this.initFormEspecialista();
  }

  ngOnInit(): void {
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
      freesync: ['', Validators.required],
      foto: ['', Validators.required],
      procesador: ['', Validators.required],
      grafica: ['', Validators.required],
      capacidad: ['', Validators.required],
      ram: ['', Validators.required],
    });
  }
  
  async onRegister() {
    let monitor: Notebook = new Notebook(
      '',
      this.userForm.value.nombre,
      this.userForm.value.modelo,
      this.foto1,
      this.userForm.value.tamanio,
      this.userForm.value.hertz,
      this.userForm.value.tiempoRespuesta,
      this.userForm.value.panel,
      this.userForm.value.resolucion,
      this.userForm.value.gsync,
      this.userForm.value.freesync,
      eTipo.Notebook,
      this.userForm.value.procesador,
      this.userForm.value.grafica,
      this.userForm.value.capacidad,
      this.userForm.value.ram,
    );
    
    this.authSrv.createMonitor(monitor)
  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

}
