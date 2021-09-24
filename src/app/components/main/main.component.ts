import { Component, HostListener, Input, OnInit } from '@angular/core';
import { eTipo } from 'src/app/class/producto';
import { BuscadorService } from 'src/app/service/buscador.service';
import { FirebaseService } from 'src/app/service/firebase.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cosas:Array<any>=[];
  message:string='';
  filtro:eTipo=eTipo.All;
  constructor(public search:BuscadorService,private firebaseSrv:FirebaseService) {
    this.cosas.splice(0,this.cosas.length)
    this.cosas= firebaseSrv.getAllProducts();
  }
  ngOnInit(): void {
    $("#leftside-navigation .sub-menu > a").click(function(e) {
    $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
    e.stopPropagation()
  })
  }

  setMessage(mensaje:any){
    this.message=mensaje;
  }
  
  setFiltroAll(){
    this.filtro=eTipo.All;
  }

  setFiltroMonitor(){
    this.filtro=eTipo.Monitor;
  }

  setFiltroNetbook(){
    this.filtro=eTipo.Notebook;
  }

  setFiltroTG(){
    this.filtro=eTipo.PlacadeVideo;
  }

  setFiltroProcesador(){
    this.filtro=eTipo.Processador;
  }

  setFiltroPerifericos(){
    this.filtro=eTipo.Periferico;
  }
}
