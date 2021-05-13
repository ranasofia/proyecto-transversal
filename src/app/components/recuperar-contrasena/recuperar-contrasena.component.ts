<<<<<<< HEAD
import { Router } from '@angular/router';
import { RecuperarContrasenaService } from './../../_service/recuperar-contrasena.service';
=======
import { RecuperarContrasenaService } from 'src/app/_service/recuperar-contrasena.service';
>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Decorador de RecuperarContrasenaComponent
 */
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
/**
 * Clase de RecuperarContrasenaComponent
 */
export class RecuperarContrasenaComponent implements OnInit {
  /**
   * Variable de tipo FormGroup que contiene el formulario de Generar Token
   */
  recuperarForm: FormGroup;
  /**
   * Permite mostrar u ocultar el valor del campo de la contraseña
   */
  hide = true;
  /**
   * Permite mostrar u ocultar el valor del campo de repetir contraseña
   */
  hide2 = true;

<<<<<<< HEAD
  /**
   * Permite configurar las validaciones del formulario
   * @returns 
   */
  createFormGroup(){
    return new FormGroup({
=======
   /**
    * Permite configurar las validaciones del formulario
    * @returns
    */
  createFormGroup(){
    return new FormGroup({

>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      validacionContrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        ValidacionesPropias.verificacionClave
      ]),
      token:new FormControl('',[
        Validators.required
      ]),

    });
  }

<<<<<<< HEAD
  /**
   * Constructor de RecuperarContrasenaComponent
=======
   /**
   *
>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
  constructor(private recuperarc:RecuperarContrasenaService,private _snackBar: MatSnackBar, private router: Router) {
    this.recuperarForm=this.createFormGroup();
  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }

  /**
   * Permite llevar la recuperación de contraseña
   */
  private recuperarContraseña(){

  if(this.recuperarForm.valid){
    var obj = {tokenRecibido:this.recuperarForm.controls["token"].value, Contrasena:this.recuperarForm.controls["password"].value};

    this.recuperarc.recuperar(obj).subscribe(data => {
      this._snackBar.open('contraseña actualizada ', 'Cancel  ', {
        duration: 3000
      });
      this.router.navigate["/login"];
    });
    
  }
}

<<<<<<< HEAD
onResetForm() {
  this.recuperarForm.reset();
}
=======

>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927

/**
  * Permite iniciar el proceso de recuperar contraseña
  * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
  */
recuperar(event: Event): any {
    event.preventDefault();
    this.recuperarContraseña();
  }
}
