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
  flag=false;
  productForm: FormGroup;
  foto1: File;
  constructor(private authSrv: FirebaseService, private fb: FormBuilder) {
    this.initFormEspecialista();
  }

  ngOnInit(): void {
  }

  private initFormEspecialista(): void {
    this.productForm = this.fb.group({
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
    this.flag=true;
    let monitor: Monitor = new Monitor(
      '100',
      this.productForm.value.nombre,
      this.productForm.value.modelo,
      this.foto1,
      this.productForm.value.tamanio,
      this.productForm.value.hertz,
      this.productForm.value.tiempoRespuesta,
      this.productForm.value.panel,
      this.productForm.value.resolucion,
      this.productForm.value.gsync,
      this.productForm.value.freesync,
      eTipo.Monitor,
    );

    if ( await this.authSrv.createMonitor(monitor)) { 
      this.flag=false;
      this.productForm.reset();
      this.authSrv.alert('success', "Monitor Creada Correctamente"); 
    }else{
      this.authSrv.alert('error',"Error!");
    }

  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

}
