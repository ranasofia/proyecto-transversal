import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentarioService } from './../../../../../_service/occibana_service/comentario.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-calificar',
  templateUrl: './dialog-calificar.component.html',
  styleUrls: ['./dialog-calificar.component.css']
})
export class DialogCalificarComponent implements OnInit {

  value = 0;
  rate = new FormControl(null, Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      idReserva: number,
      idHotel: number,
      idUsuario: number
    },
    private comCalService: ComentarioService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  calificar() {
    this.comCalService.postCalificar(
      this.data.idUsuario,
      this.data.idReserva,
      this.data.idHotel,
      this.value
    ).subscribe(
      (data) => {
        this._snackBar.open(data.mensaje, 'OK', {
          duration: 3500
        });
      }
    )
  }
}
