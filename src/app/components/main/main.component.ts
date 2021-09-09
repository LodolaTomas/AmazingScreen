import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { BuscadorService } from 'src/app/service/buscador.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cosas:Array<any>=[];
  message:string='';
  constructor(private service: AdminService,public search:BuscadorService) {
    service.getAll().subscribe((data)=>{this.cosas= data;
    console.log(this.cosas)});
  }
  ngOnInit(): void {
    this.search.currentMessage.subscribe(mensaje=>{
      if(mensaje!=''){
        this.setMessage(mensaje)
      }
    })
  }

  setMessage(mensaje:any){
    this.message=mensaje;
  }

}
