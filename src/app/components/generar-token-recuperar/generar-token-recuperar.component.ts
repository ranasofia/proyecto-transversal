import { Usuario } from 'src/app/_model/Usuario';
import { RecuperarContrasenaService } from './../../_service/recuperar-contrasena.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenRecuperacion } from 'src/app/_model/TokenRecuperacion';

/**
 * Decorador de GenerarTokenRecuperarComponent
 */
@Component({
  selector: 'app-generar-token-recuperar',
  templateUrl: './generar-token-recuperar.component.html',
  styleUrls: ['./generar-token-recuperar.component.css']
})
/**
 * Clase de GenerarTokenRecuperarComponent
 */
export class GenerarTokenRecuperarComponent implements OnInit {
  /**
   * Variable de tipo FormGroup que contiene el formulario de Generar Token
   */
  generarForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  /**
   * 
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
  constructor(private recuperar:RecuperarContrasenaService,private _snackBar: MatSnackBar) {
    this.generarForm=this.createFormGroup();
   }

  ngOnInit(): void {
  }

  private generartoken(){

    if(this.generarForm.valid){
      var usuario=new Usuario();

      usuario.correo=this.generarForm.controls["email"].value;
      
      this.recuperar.generar(usuario).subscribe(data => {
        this._snackBar.open('Se enviara un token recuperacion a su correo ', 'Cancel  ', {
          duration: 3000
        });
      }, err => {

        if (err.status == 400) {

          this._snackBar.open('El correo no existe verifiquelo', 'Cancel  ', {
            duration: 3000
          });

        }
      });

    }

  }

 

  /**
   * Permite iniciar el proceso de generar token
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  generar(event: Event): any {
    event.preventDefault();
    this.generartoken();
  }
}
