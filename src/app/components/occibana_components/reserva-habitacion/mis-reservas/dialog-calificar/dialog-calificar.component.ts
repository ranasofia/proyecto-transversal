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
  styleUrls: ['./dialog-calificar.component.css'],
})

/**
 * Clase que representa al DialogCalificarComponent
 */
export class DialogCalificarComponent implements OnInit {
  /**
   * Variable que incializa el valor de la calificación en cero
   */
  value = 0;

  /**
   * Variable que indica el formulario de calificar servicio de un hotel
   */
  rate = new FormControl(null, Validators.required);

  /**
   * Constructor sobrecargado de DialogCalificarComponent
   * @param data almacena los datos que vienen del componente padre
   * @param comCalService inyeccion del servicio de comentar y calificar de Occibana
   * @param _snackBar  objeto que se inyecta para mostrar mensajes que comuniquen información al usuario
   * @param barraProgreso inyeccion del servicio que trae la barra de progreso
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      idReserva: number;
      idHotel: number;
      idUsuario: number;
    },
    private comCalService: ComentarioService,
    private _snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService
  ) {}

  /**
   * Implementación que se ejecuta una vez se inicie el DialogCalificarComponent
   */
  ngOnInit(): void {}

  /**
   * Método que se encarga de llevar a cabo la asignación y calificación por parte de un usuario
   * al servicio de un hotel
   */
  calificar() {
    this.barraProgreso.progressBar.next('1');
    this.comCalService
      .postCalificar(
        this.data.idUsuario,
        this.data.idReserva,
        this.data.idHotel,
        this.value
      )
      .subscribe((data) => {
        this._snackBar.open(data.mensaje, 'OK', {
          duration: 3500,
        });
        this.barraProgreso.progressBar.next('2');
      });
  }
}
