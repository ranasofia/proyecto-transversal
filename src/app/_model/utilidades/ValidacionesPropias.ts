import { AbstractControl } from '@angular/forms';

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
      var clave1 = control.parent.controls['password'].value;
      var clave2 = control.value;

      if (clave1 != clave2) {
        return { verificacionClave: true };
      }
    }

    return null;
  }

  /**
   * Permite verificar si el campo de repetir correo es igual que el campo correo original
   * @param control variable que posee el control que se está validando
   * @returns resultadoValidacion
   */
  static verificacionCorreo(control: AbstractControl) {
    if (control.parent != undefined) {
      var correo1 = control.parent.controls['email'].value;
      var correo2 = control.value;

      if (correo1 != correo2) {
        return { verificacionCorreo: true };
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
    if (control.value != '') {
      var fecha: Date = new Date(control.value);
      var fechaActual = new Date();

      var edad: number = fechaActual.getFullYear() - fecha.getFullYear();

      if (
        fechaActual.getMonth() <= fecha.getMonth() &&
        fechaActual.getDate() < fecha.getDate() + 1
      ) {
        edad -= 1;
      }

      if (edad < 15) {
        return { edadValida: true };
      }
    }

    return null;
  }

  soloNumeros(event: KeyboardEvent) {
    if (
      event.key != '1' &&
      event.key != '2' &&
      event.key != '3' &&
      event.key != '4' &&
      event.key != '5' &&
      event.key != '6' &&
      event.key != '7' &&
      event.key != '8' &&
      event.key != '9' &&
      event.key != '0' &&
      event.key != 'Backspace'
    ) {
      return false;
    }
  }
}
