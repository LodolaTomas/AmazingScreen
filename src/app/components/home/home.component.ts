import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  padre:any;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}
