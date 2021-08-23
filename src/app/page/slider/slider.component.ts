import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sliders= [...document.querySelectorAll(".slider__body")];
    const arrowNext=document.querySelector('#next');
    const arrowBefore=document.querySelector('#before');
    let value:number;
    arrowNext?.addEventListener('click',()=>{changePosition(1)});
    arrowBefore?.addEventListener('click',()=>{changePosition(-1)});

    function changePosition(change:number) {
      const currenElement= Number((document.querySelector('.slider__body--show')as HTMLInputElement).dataset.id);
      value = currenElement;
      value+=change;
      if(value === 0 || value == sliders.length+1){
        value = value === 0 ? sliders.length : 1;
      }
      sliders[value-1].classList.toggle('slider__body--show');
    } 
  }

}
