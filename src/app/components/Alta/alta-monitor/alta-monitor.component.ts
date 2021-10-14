import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
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
  imgResultAfterCompress: any;
  classBotton="btn btn-danger";
  classloading="";
  texto="Sube una Foto";
  constructor(private authSrv: FirebaseService, private fb: FormBuilder,private imageCompress: NgxImageCompressService) {
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
      this.imgResultAfterCompress,
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
      this.classBotton="btn btn-danger";
      this.texto='Sube una Foto'
    }else{
      this.authSrv.alert('error',"Error!");
    }

  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.texto='';
      this.classloading="spinner-border";
      /* console.warn('Size in bytes was:', this.imageCompress.byteCount(image)); */
      this.imageCompress.compressFile(image, orientation, 50, 40).then(
        result => {
          /* console.log(result); */
          this.classloading='';
          this.texto="Foto Subida con Exito!"
          this.imgResultAfterCompress = result.split(/,(.+)/)[1];
          this.classBotton="btn btn-success";
          /* console.warn('Size in bytes is now:', this.imageCompress.byteCount(result)); */
        }
      );
    });
  }
}
