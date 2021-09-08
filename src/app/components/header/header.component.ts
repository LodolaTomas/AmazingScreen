import { Component,OnInit} from '@angular/core';
import { BuscadorService } from 'src/app/service/buscador.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private data:BuscadorService) { }

  ngOnInit(): void {
  }
  search(value:string){
    this.data.changeMessage(value);
  }

}
