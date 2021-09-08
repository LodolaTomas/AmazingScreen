import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { BuscadorService } from 'src/app/service/buscador.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cosas: any;
  message:string='';
  constructor(private service: AdminService,public search:BuscadorService) {
    service.getAllCities().subscribe(data => this.cosas = data);
  }
  ngOnInit(): void {
    this.search.currentMessage.subscribe(mensaje=> console.log(mensaje))
  }

}
