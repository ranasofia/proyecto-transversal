import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/_model/occibana_model/Comentario';
import * as moment from 'moment';

@Component({
  selector: 'app-detalles-hotel',
  templateUrl: './detalles-hotel.component.html',
  styleUrls: ['./detalles-hotel.component.css']
})
export class DetallesHotelComponent implements OnInit {

  dataComentarios: MatTableDataSource<Comentario>

  hotelSeleccionado: Hotel

  comentarios: Comentario[]

  helper: any = new JwtHelperService();

  nombreUsuario: string

  constructor(
    private serviceHotel: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelSeleccionado = this.serviceHotel.hotelSeleccionado 
    this.obtenerComentariosHotel();
    let token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN))
    this.nombreUsuario = token.name

  }

  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      data => {
        this.comentarios = data
        for (var i = 0; i < this.comentarios.length; i++) {
          this.comentarios[i].fecha_comentario = moment().locale('es').calendar()  
        }
      },
      err => {
        console.log('Ha ocurrido un error');
        
      }
    )
  }

}
