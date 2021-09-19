import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacaVideo } from 'src/app/class/placaVideo';
import { eTipo } from 'src/app/class/producto';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-alta-placadeVideo',
  templateUrl: './alta-grafica.component.html',
  styleUrls: ['./alta-grafica.component.scss']
})
export class AltaplacadeVideoComponent implements OnInit {

  flag=false;
  productForm: FormGroup;
  foto1: File;
  constructor(private authSrv:FirebaseService, private fb: FormBuilder) { 
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
      eTipo.placadeVideo,
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

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

}
