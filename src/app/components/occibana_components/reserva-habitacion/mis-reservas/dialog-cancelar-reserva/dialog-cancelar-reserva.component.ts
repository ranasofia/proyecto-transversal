import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-cancelar-reserva',
  templateUrl: './dialog-cancelar-reserva.component.html',
  styleUrls: ['./dialog-cancelar-reserva.component.css']
})
export class DialogCancelarReservaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private hotelService: HotelService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancelarReservas(): void {
    this.hotelService.cancelarReserva(this.data.id).subscribe(data => {
      let message: string;
      if(data.mensaje == "No es posible cancelar la reserva") {
        message = "No es posible cancelar una reserva que no se encuentra vigente"
      }
      this._snackBar.open(message, 'OK', {
        duration: 3500
      });
    })
  }
}
