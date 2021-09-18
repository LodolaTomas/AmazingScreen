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
    let monitor: Notebook = new Notebook(
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
      this.productForm.value.capacidad,
      this.productForm.value.ram,
    );
    
    this.authSrv.createMonitor(monitor)
  }

  onUpload1($event) {
    this.foto1 = $event.target.files[0];
  }

}
