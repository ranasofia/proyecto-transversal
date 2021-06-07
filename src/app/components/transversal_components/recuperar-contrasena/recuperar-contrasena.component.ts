import { PerfilService } from './../../../_service/occibana_service/perfil.service';
import { AdminService } from 'src/app/_service/superfast_service/admin.service';
import { ClienteService } from './../../../_service/mototaxi_service/cliente.service';
import { Router } from '@angular/router';
import { RecuperarContrasenaService } from 'src/app/_service/transversal_service/recuperar-contrasena.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

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
  /**
   * Variable que contiene la nueva contraseña
   */
  contrasena: string;
  /**
   * Variable que contiene la confirmación de contraseña
   */
  confirmarContrasena: string;
  /**
   * Variable que contiene el token de recuperacion del usuario Transversal
   */
  tokenTransversal: string;
  /**
   * Variable que contiene el token de recuperacion de SuperFast
   */
  tokenSuperFast:string;
  /**
   * Variable que contiene el token de recuperacion de Mototaxi Deluxe
   */
  tokenMototaxi: string;
  /**
   * Variable que contiene el token de recuperacion de Occibana
   */
  tokenOccibana:string;
  /**
   * Variable que contiene el token de recuperacion de HcCauchos
   */
  tokenHcCauchos:string;
  /**
   * Variable que contiene el usuario de occibana a recuperar
   */
  usuarioOccibana: string;

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
       // Validators.required
      ]),
    });
  }

 
  /**
   * Constructor de RecuperarContrasenaComponent
   * @param recuperarc objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   * @param router permite Redireccionar a otro formulario
   * @param clienteService objeto que permite usar los servicios de mototaxi
   * @param adminService objeto que permite usar los servicios de superfast
   * @param perfilService objeto que permite usar los servicios de occibana
   */
  constructor(private recuperarc:RecuperarContrasenaService,
              private _snackBar: MatSnackBar, 
              private router: Router,
              private clienteService: ClienteService,
              private adminService:AdminService,
              private perfilService: PerfilService) {
                this.recuperarForm=this.createFormGroup();
              }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
     
  }

  /**
   * Permite llevar a cabo la recuperación de contraseña de todos los proyectos
   */
  private recuperarContraseña(){
    if(this.recuperarForm.valid){
      this.tokenTransversal = this.recuperarForm.controls["token"].value;
      this.contrasena = this.recuperarForm.controls["password"].value;
      this.confirmarContrasena = this.recuperarForm.controls["validacionContrasena"].value;

      this.tokenSuperFast = sessionStorage.getItem(environment.TOKENSPFRC);
      this.tokenMototaxi = sessionStorage.getItem(environment.TOKENMTRC);
      this.tokenOccibana = sessionStorage.getItem(environment.TOKENOCRC);
      this.usuarioOccibana = sessionStorage.getItem(environment.USEROCRC);

      var body = {tokenRecibido: this.tokenTransversal, Contrasena: this.contrasena};

      this.recuperarc.recuperar(body).subscribe(data => {
        this.recuperarContraseñaSuperFast(this.tokenSuperFast, this.contrasena);
        this.recuperarContraseñaMototaxi(this.tokenMototaxi, this.contrasena, this.confirmarContrasena);
        this.recuperarContraseñaOccibana(this.usuarioOccibana, this.contrasena, this.tokenOccibana);

        this._snackBar.open('Contraseña actualizada', 'Cancel  ', {
          duration: 5000
        });
        this.router.navigate(['/login']);
      });

      //this.recuperarContraseñaHcCauchos();
    }
  }
  
  /**
   * Metodo que realiza la recuperación de contraseña de SuperFast
   * @param token variable que contiene el token generado para recuperar
   * @param contrasena variable que contiene la nueva contraseña
   */
  recuperarContraseñaSuperFast(token: string, contrasena: string){
    var body = {Token: token, NuevaContrasenia: contrasena};

    this.adminService.postRecuperarContraseña(body).subscribe();
    sessionStorage.removeItem(environment.TOKENSPFRC);
  }
  
  /**
   * Metodo que realiza la recuperación de contraseña de Mototaxi Deluxe
   * @param token variable que contiene el token generado para recuperar
   * @param contrasena variable que contiene la nueva contraseña
   * @param confirContrasena variable que contiene la confirmación de contraseña
   */
  recuperarContraseñaMototaxi(token: string, contrasena: string, confirContrasena: string){
    var body = {Contrasena: contrasena, ContrasenaConfirmada: confirContrasena};
  
    this.clienteService.putRecuperarContraseña(token, body).subscribe();
    sessionStorage.removeItem(environment.TOKENMTRC);
  }
  
  /**
   * Metodo que realiza la recuperación de contraseña de Mototaxi Deluxe
   * @param user variable que contiene el usuario que va a recuperar
   * @param contrasena variable que contiene la nueva contraseña
   * @param token variable que contiene el token generado para recuperar
   */
  recuperarContraseñaOccibana(user: string, contrasena: string, token: string){
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(user, 'usuarioOccibana');
    var userDecrypt = bytes.toString(CryptoJS.enc.Utf8);

    var body = {usuario: userDecrypt, contrasena: contrasena, codigo: token};

    this.perfilService.putRecuperarContraseña(body).subscribe();
    sessionStorage.removeItem(environment.TOKENOCRC);
    sessionStorage.removeItem(environment.USEROCRC);
  }
  
  //
  recuperarContraseñaHcCauchos(){
    
  }

  /**
    * Permite iniciar el proceso de recuperar contraseña
    * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
    */
  recuperar(event: Event): any {
    event.preventDefault();
    this.recuperarContraseña();
  }
}
