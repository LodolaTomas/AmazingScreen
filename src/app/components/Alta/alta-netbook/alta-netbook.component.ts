import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notebook } from 'src/app/class/notebook';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-alta-netbook',
  templateUrl: './alta-netbook.component.html',
  styleUrls: ['./alta-netbook.component.scss']
})
export class AltaNetbookComponent implements OnInit {
  flag=false;
  productForm: FormGroup;
  foto1: File;
  imgResultAfterCompress: any;
  classBotton="btn btn-danger";
  classloading="";
  texto="Sube una Foto";
  constructor(private authSrv:FirebaseService, private fb: FormBuilder,private imageCompress: NgxImageCompressService) { 
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
      procesador: ['', Validators.required],
      placadeVideo: ['', Validators.required],
      capacidad: ['', Validators.required],
      ram: ['', Validators.required],
    });
  }
  
  async onRegister() {
    this.flag=true;
    let netbook: Notebook = new Notebook(
      '',
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
      eTipo.Notebook,
      this.productForm.value.procesador,
      this.productForm.value.placadeVideo,
      this.productForm.value.ram,
      this.productForm.value.capacidad,
    );
    
    if ( await this.authSrv.createNetbook(netbook)) { 
      this.flag=false;
      this.productForm.reset();
      this.authSrv.alert('success', "Netbook Creada Correctamente"); 
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
