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
   * variable que contiene el token de recuperacion
   */
  public tokenMototaxi: string;
  tokenSuperFast:string;
  tokenOccibana:string;
  tokenHcCauchos:string;

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
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
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
   * Permite llevar la recuperación de contraseña
   */
  private recuperarContraseña(){
    if(this.recuperarForm.valid){
      var obj = {tokenRecibido:this.recuperarForm.controls["token"].value, 
                Contrasena:this.recuperarForm.controls["password"].value};

      this.recuperarc.recuperar(obj).subscribe(data => {
        this._snackBar.open('Contraseña actualizada ', 'Cancel  ', {
          duration: 3000
        });
        this.router.navigate(['/login']);
      });
      //this.recuperarContraseñaSuperFast();
      //this.recuperarContraseñaMototaxi();
      //this.recuperarContraseñaOccibana();
      //this.recuperarContraseñaHcCauchos();
    }
  }
  //  
  recuperarContraseñaSuperFast(){
    var contraseña = {Token: sessionStorage.getItem(environment.TOKENSPFRC), 
                      NuevaContrasenia: this.recuperarForm.controls["password"].value};

    this.adminService.postRecuperarContraseña(contraseña).subscribe(data =>{
      this._snackBar.open('Contraseña actualizada ', 'Cancel  ', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    });
    sessionStorage.removeItem(environment.TOKENSPFRC);
  }
  //
  recuperarContraseñaMototaxi(){
    var contraseña = {Contrasena: this.recuperarForm.controls["password"].value, 
                      ContrasenaConfirmada: this.recuperarForm.controls["validacionContrasena"].value};
  
    this.clienteService.putRecuperarContraseña(sessionStorage.getItem(environment.TOKENMTRC), contraseña)
    .subscribe(data => {
      this._snackBar.open('Contraseña actualizada ', 'Cancel  ', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    });
    sessionStorage.removeItem(environment.TOKENMTRC);
  }
  //
  recuperarContraseñaOccibana(){
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(sessionStorage.getItem(environment.USEROCRC), 'usuarioOccibana');
    var userDecrypt = bytes.toString(CryptoJS.enc.Utf8);

    var contraseña = {usuario: userDecrypt,
                      contrasena: this.recuperarForm.controls["password"].value,
                      codigo: sessionStorage.getItem(environment.TOKENOCRC)};

    this.perfilService.putRecuperarContraseña(contraseña).subscribe(data => {
      this._snackBar.open('Contraseña actualizada ', 'Cancel  ', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    })
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
