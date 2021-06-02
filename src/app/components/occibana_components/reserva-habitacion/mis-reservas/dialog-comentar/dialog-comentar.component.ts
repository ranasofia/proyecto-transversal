import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComentarioService } from './../../../../../_service/occibana_service/comentario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

/**
 * Decorador de DialogComentarComponent
 */
@Component({
  selector: 'app-dialog-comentar',
  templateUrl: './dialog-comentar.component.html',
  styleUrls: ['./dialog-comentar.component.css'],
})

/**
 * Representa la clase DialogComentarComponent
 */
export class DialogComentarComponent implements OnInit {
  /**
   * Variable que indica el formulario para el comentario
   */
  comentarioF: FormGroup;

  /**
   * Variable para guardar el estado habilitado o deshabilitado de un botón
   */
  isDisabled: boolean;

  /**
   * Constructor sobrecargado de la clase DialogComentarComponent
   * @param data
   * @param comCalService
   * @param _snackBar
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      idUsuario: number;
      idHotel: number;
    },
    private comCalService: ComentarioService,
    private _snackBar: MatSnackBar
  ) {
    this.comentarioF = this.createFormGroup();
  }

  /**
   * Implementación que se ejecuta una vez se inicie el DialogComentarComponent
   */
  ngOnInit(): void {
    this.isDisabled = true;
  }

  /**
   * Método que se encarga de configurar las validaciones del formulario comentario
   * @returns grupoFormulario
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      comentarioF: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Método que se encarga de crear un comentario por parte del usuario al hotel, a partir de su id
   */
  comentar(): void {
    let comentario = this.comentarioF.value['comentarioF'];
    this.comCalService
      .postComentar(this.data.idUsuario, comentario, this.data.idHotel)
      .subscribe((data) => {
        this._snackBar.open(data.mensaje, 'OK', {
          duration: 3000,
        });
      });
  }

  /**
   * Método que se encarga de no permitir que se pueda enviar un comentario cuando el input este vacío
   * @param comentario
   */
  comentarValido(comentario: string): void {
    if (comentario.trim() == null || comentario.trim() === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
}
