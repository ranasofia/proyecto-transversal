import { AbstractControl } from '@angular/forms'

/**
 * Clase para las validaciones propias de la aplicación
 */
export class ValidacionesPropias {

  /**
   * Permite verificar si el campo de repetir contraseña posee la misma contraseña que el original
   * @param control variable que posee el control que se está validando
   * @returns resultadoValidacion
   */
  static verificacionClave(control: AbstractControl) {

    if (control.parent != undefined) {

      var clave1 = control.parent.controls["password"].value;
      var clave2 = control.value;

      if (clave1 != clave2) {

        return { verificacionClave: true };

      }
    }

    return null;

  }

  /**
   * Permite verificar si el usuario que se registra tiene al menos 15 años
   * @param control variable que posee el control que se está validando
   * @returns resultadoValidacion
   */
  static edadValida(control: AbstractControl) {
    if (control.value != "") {

      var fecha: Date = new Date(control.value);
      var fechaActual = new Date();

      var edad: number = fechaActual.getFullYear() - fecha.getFullYear();


      if (fechaActual.getMonth() <= fecha.getMonth() && fechaActual.getDate() < (fecha.getDate()+1)) {

        edad -= 1;

      }

      if (edad < 15) {

        return { edadValida: true };

      }

    }

    return null;

  }


}
