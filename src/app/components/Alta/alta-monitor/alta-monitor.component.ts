import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Monitor } from 'src/app/class/monitor';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-alta-monitor',
  templateUrl: './alta-monitor.component.html',
  styleUrls: ['./alta-monitor.component.scss']
})
export class AltaMonitorComponent implements OnInit {

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
      this.userForm.value.freesync,
      eTipo.Monitor,
    );
    
    this.authSrv.createMonitor(monitor)
  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

}
