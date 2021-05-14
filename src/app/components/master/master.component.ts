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
  constructor(private clienteService: ClienteService,private barraProgresoService: BarraProgresoService) {
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
  }

  /**
   * Metodo que se encarga de cerrar sesion y eliminar el token
   */
  cerrarSesion() {
    /**
     * Constante para decodificar el token
     */
    const HELPER = new JwtHelperService();
    /**
     * Variable que decodifica el toquen y captura el usuario logueado
     */
    var nombre = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    this.clienteService.putCerrarSesion(nombre).subscribe();
    this.clienteService.deleteEliminarToken(nombre).subscribe();
    //Remueve el token de la sesion
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.TOKEN_HCCAUCHOS);
    sessionStorage.removeItem(environment.TOKEN_MOTOTAXI);
    sessionStorage.removeItem(environment.TOKEN_OCCIBANA);
    sessionStorage.removeItem(environment.TOKEN_SUPERFAST);
  }
}
