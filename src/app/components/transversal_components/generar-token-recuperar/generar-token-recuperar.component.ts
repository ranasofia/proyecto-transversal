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
   * variable que contiene el correo 
   */
  correoMototaxi: string;
  correoSuperfast: string;
  correoOccibana: string;
  correoHcCauchos: string;  

  /**
   * variable que contiene el usuario 
   */
  public user: string;

  /**
   * varible que contiene el token generado 
   */
  public tokenMototaxi: string;
  public tokenSuperFast: string;
  public tokenHcCauchos: string;
  public tokenOccibana: string;

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
   * Permite llevar a cabo generar el token de recuperacion de contraseña
   */
  private generartoken(){

    if(this.generarForm.valid){
      var usuario=new Usuario();

      usuario.correo=this.generarForm.controls["email"].value;
      this.recuperar.generar(usuario).subscribe(data => {
          this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
            duration: 5000
          });
          this.router.navigate(['/recuperarContrasena']);
      });
     
     
   
      

        
      
   
    }
  }

  //
  generarTokenSuperFast(){
    this.correoSuperfast = this.generarForm.controls["email"].value;
    this.adminService.getGenerarContraseña(this.correoSuperfast).subscribe(data=>{
      this.tokenSuperFast=data[""];
      sessionStorage.setItem(environment.TOKENSPFRC,this.tokenSuperFast);
    });
  }
  //
  generarTokenMototaxi(){
    this.correoMototaxi = this.generarForm.controls["email"].value;
    this.clienteService.getDatosRecuperar(this.correoMototaxi).subscribe(data=>{
      this.user=data["usuario"];
     
      var usuario = new Usuario();
      usuario.usuario = this.user;
      this.clienteService.getGenerarContraseña(usuario).subscribe(data=>{
        this.tokenMototaxi = data["tokenGenerar"];
        sessionStorage.setItem(environment.TOKENMTRC,this.tokenMototaxi);
      });
    });
      
    this.router.navigate(['/recuperarContrasena']);
  }
  //
  generarTokenOccibana(){
    this.correoOccibana = this.generarForm.controls["email"].value;
    this.clienteService.getDatosRecuperar(this.correoOccibana).subscribe(data=>{
      this.user = data["usuario"];
    });

    var generar = {usuario: this.user, correo: this.correoOccibana};

    this.perfilService.postGenerarContraseña(generar).subscribe(data => {
      this.tokenOccibana = data["tokengenerado"];
      sessionStorage.setItem(environment.TOKENOCRC,this.tokenOccibana);
    });
  }
  //
  generarTokenHcCauchos(){
    
  }
  //


  /**
   * Permite iniciar el proceso de generar token
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  generar(event: Event): any {
    event.preventDefault();
    this.generartoken();
  }
}
