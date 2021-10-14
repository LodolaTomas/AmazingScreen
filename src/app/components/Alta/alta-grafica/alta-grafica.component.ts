import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacaVideo } from 'src/app/class/placaVideo';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-alta-placadeVideo',
  templateUrl: './alta-grafica.component.html',
  styleUrls: ['./alta-grafica.component.scss']
})
export class AltaplacadeVideoComponent implements OnInit {

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
      foto: ['', Validators.required],
      ram: ['', Validators.required],
    });
  }
  
  async onRegister() {
    this.flag=true;
    let placaVideo: PlacaVideo = new PlacaVideo(
      '',
      this.productForm.value.nombre,
      this.productForm.value.modelo,
      this.foto1,
      eTipo.PlacadeVideo,
      this.productForm.value.ram,
    );
    
    if ( await this.authSrv.createPlacaVideo(placaVideo)) { 
      this.flag=false;
      this.productForm.reset();
      this.authSrv.alert('success', "Placa de Video Creada Correctamente"); 
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
