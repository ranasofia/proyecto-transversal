import { RecuperarContrasenaService } from './../../_service/recuperar-contrasena.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/_model/Usuario';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
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

   /**
    * Permite configurar las validaciones del formulario
    * @returns 
    */
  createFormGroup(){
    return new FormGroup({
     
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

   /**
   * 
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
    constructor(private recuperarc:RecuperarContrasenaService,private _snackBar: MatSnackBar) {
      this.recuperarForm=this.createFormGroup();
     }

  ngOnInit(): void {
  }

token:string;
private recuperarContraseña(){

  if(this.recuperarForm.valid){
    var usuario = new Usuario();

    usuario.contrasena=this.recuperarForm.controls["password"].value;
    usuario.token=this.recuperarForm.controls["token"].value;


    this.recuperarc.recuperar(usuario).subscribe(data => {
      this._snackBar.open('contraseña actualizada ', 'Cancel  ', {
        duration: 3000
      });
    });
  }

}

  

  recuperar(event: Event): any {
    event.preventDefault();
    this.recuperarContraseña();
  }
}
