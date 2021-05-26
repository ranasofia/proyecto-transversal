import { Habitacion } from './../../../_model/occibana_model/Habitacion';
import { ActivatedRoute } from '@angular/router';
import { PanelHotelService } from './../../../_service/occibana_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva-habitacion',
  templateUrl: './reserva-habitacion.component.html',
  styleUrls: ['./reserva-habitacion.component.css']
})
export class ReservaHabitacionComponent implements OnInit {

  informacionHabitacion: Habitacion

  constructor(
    private panelHotelService: PanelHotelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( data => {
      let idHabitacion = data.id
      this.obtenerInformacionHabitacion(idHabitacion)
    });
  }

  obtenerInformacionHabitacion(idHabitacion: number): void {
    this.panelHotelService.postInformacionHabitacion(idHabitacion).subscribe(
      (data) => {
        this.informacionHabitacion = data
      },
      (error) => {

      }
    )
  }
}
