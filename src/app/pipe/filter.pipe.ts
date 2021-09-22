import { Pipe, PipeTransform } from '@angular/core';
import { eTipo } from '../class/producto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === eTipo.All) return value
    const resultPost=[];
    for (const producto of value) {
      if(producto.tipo===arg){
        resultPost.push(producto)
      }
    }
    return resultPost
  }

}

