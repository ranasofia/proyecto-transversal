import { PerfilService } from './../../../_service/occibana_service/perfil.service';
import { ClienteService } from './../../../_service/mototaxi_service/cliente.service';
import { AdminService } from './../../../_service/superfast_service/admin.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { RecuperarContrasenaService } from 'src/app/_service/transversal_service/recuperar-contrasena.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

/**
 * Decorador de GenerarTokenRecuperarComponent
 */
@Component({
  selector: 'app-generar-token-recuperar',
  templateUrl: './generar-token-recuperar.component.html',
  styleUrls: ['./generar-token-recuperar.component.css']
})
/**
 * Clase que maneja la logica de la interfaz de GenerarTokenRecuperarComponent
 */
export class GenerarTokenRecuperarComponent implements OnInit {
  /**
   * Variable de tipo FormGroup que contiene el formulario de Generar Token
   */
  generarForm: FormGroup;
  /**
   * Variable que contiene el correo 
   */
  correo: string;
  /**
   * Variable que contiene el usuario 
   */
  user: string;
  /**
   * Varible que contiene el token generado de SuperFast
   */
  tokenSuperFast: string;
  /**
   * Varible que contiene el token generado de Mototaxi Deluxe
   */
  tokenMototaxi: string;
  /**
   * Varible que contiene el token generado de Occibana
   */
  tokenOccibana: string;
  /**
   * Varible que contiene el token generado de HcCauchos
   */
  tokenHcCauchos: string;

  /**
   * Permite configurar las validaciones del formulario
   * @returns
   */
  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  /**
   * Constructor de GenerarTokenRecuperarComponent
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   * @param router permite Redireccionar a otro formulario
   * @param clienteService objeto que permite usar los servicios de mototaxi
   * @param adminService objeto que permite usar los servicios de superfast
   * @param perfilService objeto que permite usar los servicios de occibana
   */
  constructor(private recuperar:RecuperarContrasenaService,
              private _snackBar: MatSnackBar, 
              private router: Router,
              private adminService: AdminService,
              private clienteService: ClienteService,
              private perfilService: PerfilService) {
                this.generarForm=this.createFormGroup();
              }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
    
  }

  /**
   * Permite llevar a cabo generar el token de recuperacion de contraseña de todos los proyectos
   */
  private generartoken(){
    if(this.generarForm.valid){
      this.correo = this.generarForm.controls["email"].value;

      var usuarioTransversal = new Usuario();
      var usuarioMototaxi = new Usuario();
      usuarioTransversal.correo = this.correo;
      
      this.generarTokenTransversal(usuarioTransversal);
      this.generarTokenSuperFast(this.correo);

      this.clienteService.getDatosRecuperar(this.correo).subscribe(data => {
        this.user = data["usuario"];
        usuarioMototaxi.usuario = this.user;

        this.generarTokenMototaxi(usuarioMototaxi);
        this.generarTokenOccibana(this.user, this.correo);
      });
      
      //this.generarTokenHcCauchos();
    }
  }

  /**
   * Metodo que genera el token para recuperar contraseña del usuario transversal
   * @param user Variable tipo Usuario que contiene el correo del usuario para realizar la petición
   */
  generarTokenTransversal(user: Usuario){
    this.recuperar.generar(user).subscribe(data => {
      this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
        duration: 5000
      });
      this.router.navigate(['/recuperarContrasena']);
    });
  }
  
  /**
   * Metodo que genera el token para recuperar contraseña de SuperFast
   * @param email Variable que contiene el correo del usuario para realizar la petición
   */
  generarTokenSuperFast(email: string){
    this.adminService.getGenerarContraseña(email).subscribe(data=>{
      this.tokenSuperFast = data.toString();
      sessionStorage.setItem(environment.TOKENSPFRC,this.tokenSuperFast);
      this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
        duration: 5000
      });
      this.router.navigate(['/recuperarContrasena']);
    });
  }
  
  /**
   * Metodo que genera el token para recuperar contraseña de Mototaxi Deluxe
   * @param user Variable tipo Usuario que contiene el usuario para realizar la petición
   */
  generarTokenMototaxi(user: Usuario){
    this.clienteService.getGenerarContraseña(user).subscribe(data=>{
      this.tokenMototaxi = data["tokenGenerar"];
      sessionStorage.setItem(environment.TOKENMTRC,this.tokenMototaxi);
      this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
        duration: 5000
      });
      this.router.navigate(['/recuperarContrasena']);
    });
  }
  
  /**
   * Metodo que genera el token para recuperar contraseña de Occibana
   * @param user Variable que contiene el usuario para realizar la petición
   * @param email Variable que contiene el correo del usuario para realizar la petición
   */
  generarTokenOccibana(user: string, email: string){
    var usuario = {usuario: user, correo: email};

    this.perfilService.postGenerarContraseña(usuario).subscribe(data => {
      if(data["mensajeTransversal"] == "Ya existe una recuperacion de contraseña activa, porfavor espere a que pueda realizar una de nuevo"){
        this._snackBar.open('Ya existe una recuperacion de contraseña activa, porfavor espere a que pueda realizar una de nuevo', 'Cancel  ', {
          duration: 5000
        });
      }else{
        var cryptoJS = require("crypto-js");
        var userEncrypt = cryptoJS.AES.encrypt(user, 'usuarioOccibana');

        sessionStorage.setItem(environment.USEROCRC, userEncrypt);

        this.tokenOccibana = data["tokengenerado"];
        sessionStorage.setItem(environment.TOKENOCRC,this.tokenOccibana);
        this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
          duration: 5000
        });
        this.router.navigate(['/recuperarContrasena']);
      }
    });
  }

  //
  generarTokenHcCauchos(){
    
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
