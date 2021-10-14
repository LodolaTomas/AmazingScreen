import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Generico } from 'src/app/class/generico';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-alta-generica',
  templateUrl: './alta-generica.component.html',
  styleUrls: ['./alta-generica.component.scss']
})
export class AltaGenericaComponent implements OnInit {

  flag=false;
  productForm: FormGroup;
  foto1: File;
  imgResultAfterCompress:string;
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
      info: ['', Validators.required],
      foto: ['', Validators.required],
      tipo: ['',Validators.required],
    });
  }
  
  async onRegister() {
    this.flag=true;
    let productoGenerico: Generico = new Generico(
      '',
      this.foto1,
      this.productForm.value.tipo,
      this.productForm.value.info,
    );
    if ( await this.authSrv.createProductoGenerico(productoGenerico)) { 
      this.flag=false;
      this.productForm.reset();
      this.authSrv.alert('success', "Placa de Video Creada Correctamente"); 
    }else{
      this.authSrv.alert('error',"Error!");
    }
  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
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
