import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any = '', arg: any = ''): any {
    if (arg === '' || arg.length < 2) return value
    const resultPost = [];
    for (const producto of value) {
      if (producto.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1 || producto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(producto)
      }
    }
      return resultPost;

  }

}
