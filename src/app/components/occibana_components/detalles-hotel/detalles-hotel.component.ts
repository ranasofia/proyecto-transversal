import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/_model/occibana_model/Comentario';

@Component({
  selector: 'app-detalles-hotel',
  templateUrl: './detalles-hotel.component.html',
  styleUrls: ['./detalles-hotel.component.css']
})
export class DetallesHotelComponent implements OnInit {

  hotelSeleccionado: Hotel

  comentarios: Comentario[]

  constructor(
    private serviceHotel: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelSeleccionado = this.serviceHotel.hotelSeleccionado 
    this.obtenerComentariosHotel();
  }

  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      data => {
        this.comentarios = data
      },
      err => {
        console.log('Ha ocurrido un error');
        
      }
    )
  }

}
