import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentarioService } from './../../../../../_service/occibana_service/comentario.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';

/**
 * Decorador del Componente DialogCalificar
 */
@Component({
  selector: 'app-dialog-calificar',
  templateUrl: './dialog-calificar.component.html',
  styleUrls: ['./dialog-calificar.component.css']
})

/**
 * Clase del DialogCalificarComponent
 */
export class DialogCalificarComponent implements OnInit {

  /**
   * 
   */
  value = 0;

  /**
   * 
   */
  rate = new FormControl(null, Validators.required);

  /**
   * Constructor sobrecargado de DialogCalificarComponent
   * @param data 
   * @param comCalService 
   * @param _snackBar 
   * @param barraProgreso 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      idReserva: number,
      idHotel: number,
      idUsuario: number
    },
    private comCalService: ComentarioService,
    private _snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService
  ) { }

  /**
   * Implementación que se ejecuta una vez se inicie el DialogCalificarComponent
   */
  ngOnInit(): void {
  }

  calificar() {
    this.barraProgreso.progressBar.next("1");
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
        this.barraProgreso.progressBar.next("2");
      }
    )
  }
}
