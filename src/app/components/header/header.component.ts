import { Component,HostListener,OnInit} from '@angular/core';
import { BuscadorService } from 'src/app/service/buscador.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(/* private data:BuscadorService */) { }

  ngOnInit(): void {
  }/* 
  @HostListener("input", ["$event.target.value"])
  onInput(value:any) {
    this.data.changeMessage(value);
  } */
}
