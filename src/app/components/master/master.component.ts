import { LoginHCService } from './../../_service/hccauchos_service/login-hc.service';
import { UsuarioOccibana } from './../../_model/occibana_model/UsuarioOccibana';
import { RegistroLoginOccibanaService } from './../../_service/occibana_service/registro-login-occibana.service';
import { AdminService } from './../../_service/superfast_service/admin.service';
import { BarraProgresoService } from './../../_service/barra-progreso.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { Component, OnInit, DoCheck } from '@angular/core';
/**
 * Decorador de Mastercomponent
 */
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
/**
 * Clase de Mastercomponent
 */
export class MasterComponent implements OnInit, DoCheck {
  /**
   * Variable que alamacena el token que se genera al ingresar al login
   */
  token: string;
  token1: string;
  token2: string;
  token3: string;
  token4: string;

  /**
   * Variable de tipo string en donde se le asigna un color a la barra de progreso
   */
  color: string = "warn";

  /**
   * Variable de tipo boolean para manejar la visualización de la barra de progreso
   */
  progressBar: boolean = true;

  /**
   * Constructor que inicializa las variables globales de componente
   * @param clienteService
   */
  constructor(private clienteService: ClienteService,
              private barraProgresoService: BarraProgresoService,
              private adminService: AdminService,
              private registroLoginOccibanaService: RegistroLoginOccibanaService,
              private loginHCService: LoginHCService) {
                
    barraProgresoService.progressBar.subscribe(data => {
      if (data == "1") {
        this.progressBar = false;
      }else {
        this.progressBar = true;
      }
    });
  }

  ngOnInit(): void {

  }

  /**
   * Implementacion que se ejecuta cada vez que se verifican las propiedades de entrada del componente
   */
  ngDoCheck(): void {
    this.token = sessionStorage.getItem(environment.TOKEN);
    this.token1 = sessionStorage.getItem(environment.TOKEN_MOTOTAXI);
    this.token2 = sessionStorage.getItem(environment.TOKEN_SUPERFAST);
    this.token3 = sessionStorage.getItem(environment.TOKEN_OCCIBANA);
    this.token4 = sessionStorage.getItem(environment.TOKEN_HCCAUCHOS);
  }

  /**
   * Metodo que se encarga de cerrar sesion y eliminar el token
   */
  cerrarSesion() {
    /**
     * Constante para decodificar el token
     */
    const HELPER = new JwtHelperService();  

    if(this.token1 != undefined){
      /**
        * Variable que decodifica el toquen y captura el usuario logueado
        */
      var nombreMototaxi = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_MOTOTAXI))["name"];
      //Metodos que cierran sesion en Mototaxi Deluxe
      this.clienteService.putCerrarSesion(nombreMototaxi).subscribe();
      this.clienteService.deleteEliminarToken(nombreMototaxi).subscribe();
      console.log("Mototaxi Deluxe Cerró Sesión");
      //Remueve el token de la sesion
      sessionStorage.removeItem(environment.TOKEN_MOTOTAXI);

    }
    if (this.token2 != undefined){
      /**
        * Variable que decodifica el toquen y captura el usuario logueado
        */     
      var nombreSuperFast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST))["nameid"];
      //Metodo que cierra sesion en SuperFast
      this.adminService.postCerrarSesion(nombreSuperFast).subscribe();
      console.log("SuperFast Cerró Sesión");
      //Remueve el token de la sesion
      sessionStorage.removeItem(environment.TOKEN_SUPERFAST);

    }
    if (this.token3 != undefined){
      /**
        * Variable que decodifica el toquen y captura el usuario logueado
        */
      var nombreOccibana = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_OCCIBANA))["name"];
      var usuarioOcc = new UsuarioOccibana();
      usuarioOcc.usuario = nombreOccibana;
      //Metodo que cierra sesion en Occibana
      this.registroLoginOccibanaService.postCerrarSesion(usuarioOcc).subscribe();
      console.log("Occibana Cerró Sesión");
      //Remueve el token de la sesion
      sessionStorage.removeItem(environment.TOKEN_OCCIBANA);

    }
    if(this.token4 != undefined){
      /**
        * Variable que decodifica el toquen y captura el usuario logueado
        */
      var nombreHcCauchos = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_HCCAUCHOS))["nameid"];
      //Metodo que cierra sesion en HC Cauchos
      this.loginHCService.putCerrarSesion(nombreHcCauchos).subscribe();
      console.log(nombreHcCauchos);
      console.log("HC Cauchos Cerró Sesion");
      //Remueve el token de la sesion
      sessionStorage.removeItem(environment.TOKEN_HCCAUCHOS);
      
    }
    
    this.delay(1000);
    //Remueve el token de la sesion
    sessionStorage.removeItem(environment.TOKEN);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
