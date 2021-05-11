import { Pipe, PipeTransform } from '@angular/core';
import { HotelPrincipal } from '../_model/occibana_model/HotelPrincipal';

@Pipe({
  name: 'hoteles'
})
export class HotelesPipe implements PipeTransform {

  
  transform(listaHoteles: HotelPrincipal[], palabra: string): any {
    const resultHotel = [];
    for (const hotel of listaHoteles) {
      if (hotel.nombre.indexOf(palabra) > -1) {
        resultHotel.push(hotel);
      }
    }
    return resultHotel;
  }

}
