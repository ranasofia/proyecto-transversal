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
      this._snackBar.open(data.mensaje, 'OK', {
        duration: 2500
      });
    })
  }
}
