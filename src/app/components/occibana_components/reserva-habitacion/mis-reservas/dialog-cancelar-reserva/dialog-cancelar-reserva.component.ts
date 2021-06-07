import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';

/**
 * Decorador del Componente DialogCancelarReserva
 */
@Component({
  selector: 'app-dialog-cancelar-reserva',
  templateUrl: './dialog-cancelar-reserva.component.html',
  styleUrls: ['./dialog-cancelar-reserva.component.css'],
})

/**
 * Clase que representa al DialogCancelarReservaComponent
 */
export class DialogCancelarReservaComponent implements OnInit {
  /**
   * Constructor sobrecargado de DialogCancelarReservaComponent
   * @param data almacena los datos que vienen del componente padre
   * @param hotelService inyeccion del servicio de hotel de Occibana
   * @param _snackBar objeto que se inyecta para mostrar mensajes que comuniquen información al usuario
   * @param barraProgreso inyeccion del servicio que trae la barra de progreso
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private hotelService: HotelService,
    private _snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService
  ) {}

  /**
   * Implementación que se ejecuta una vez se inicie el DialogCancelarReservaComponent
   */
  ngOnInit(): void {}

  /**
   * Método que se encarga de llevar a cabo la cancelación de una reserva hecha por el usuario
   * a traves del id del hotel
   */
  cancelarReservas(): void {
    this.barraProgreso.progressBar.next('1');
    this.hotelService.cancelarReserva(this.data.id).subscribe((data) => {
      if (data.mensaje == 'No es posible cancelar la reserva') {
        data.mensaje =
          'No es posible cancelar una reserva que no se encuentra vigente';
      }
      this._snackBar.open(data.mensaje, 'OK', {
        duration: 3500,
      });
      this.barraProgreso.progressBar.next('2');
    });
  }
}
