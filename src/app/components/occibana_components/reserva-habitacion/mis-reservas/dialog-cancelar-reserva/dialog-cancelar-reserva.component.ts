import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';

@Component({
  selector: 'app-dialog-cancelar-reserva',
  templateUrl: './dialog-cancelar-reserva.component.html',
  styleUrls: ['./dialog-cancelar-reserva.component.css']
})
export class DialogCancelarReservaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private hotelService: HotelService,
    private _snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService
  ) { }

  ngOnInit(): void {
  }

  cancelarReservas(): void {
    this.barraProgreso.progressBar.next("1");
    this.hotelService.cancelarReserva(this.data.id).subscribe(data => {
      if(data.mensaje == "No es posible cancelar la reserva") {
        data.mensaje = "No es posible cancelar una reserva que no se encuentra vigente"
      }
      this._snackBar.open(data.mensaje, 'OK', {
        duration: 3500
      });
      this.barraProgreso.progressBar.next("2");
    })
  }
}
