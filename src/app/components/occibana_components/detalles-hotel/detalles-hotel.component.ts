import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-hotel',
  templateUrl: './detalles-hotel.component.html',
  styleUrls: ['./detalles-hotel.component.css']
})
export class DetallesHotelComponent implements OnInit {

  hotelSeleccionado: Hotel

  constructor(
    private serviceHotel: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelSeleccionado = this.serviceHotel.hotelSeleccionado 

  }

}
