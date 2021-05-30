import { MatSnackBar } from '@angular/material/snack-bar';
import { HistorialService } from './../../../_service/mototaxi_service/historial.service';
import { BarraProgresoService } from '../../../_service/utilidades/barra-progreso.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Decorador de HistorialClienteComponent
 */
@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})

/**
 * Clase de HistorialClienteComponent
 */
export class HistorialClienteComponent implements OnInit {

  /**
   * Objeto de tipo de array de la clase Notificacion
   */
  notificaciones: Notificacion[];
  /**
   * Objeto que instancia una tabla de Angular Material cuyo tipo de dato es Notificacion
   */
  dataSource = new MatTableDataSource<Notificacion>();
  /**
   * Objeto array de tipo string el cual representa las columnas de la tabla
   */
  displayedColumns: string[];
  /**
   * Decorador de ViewChild el cual permite visualizar el ordenamiento de cada columna en la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   * Constructor que iniciliza las variables globales de HistorialClienteComponent
   * @param clienteService
   * @param router
   */
  constructor(private historial: HistorialService,
              private barraProgresoService: BarraProgresoService,
              private _snackBar: MatSnackBar) { }

  /**
   * Implementación que se ejecuta una vez se inicie el HistorialClienteComponent
   */
  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");
    /**
      * Constante para decodificar el token
      */
    const helper = new JwtHelperService();
    /**
      * Variable que decodifica el toquen y captura el usuario logueado
      */
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    // Método que traer el historial del cliente
    this.historial.getHistorial("", usuario).subscribe(data => {
      this.notificaciones = data;
      if(this.notificaciones != undefined){
        this.dataSource = new MatTableDataSource(this.notificaciones);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      }
      /*if(this.notificaciones == undefined){
        this._snackBar.open('No hay datos en el historial para mostrar, te invitamos a solicitar un servicio', 'Cancel  ', {
          duration: 5000
        });
      }*/
    });
    
    // Nombres de la columnas de la tabla
    this.displayedColumns = ['soy','conductor', 'destino', 'ubicacion', 'tarifa', 'fechaCarrera', 'comentario', 'comentar','conversacion','conversar'];

    this.barraProgresoService.progressBar.next("2");
  }

  /**
   * Método que se encarga de filtrar una cadena de texto en el data source
   * que se obtiene a partir del input de búsqueda
   * @param filter cadena de texto de llega desde el input de búsqueda
   */
  dataFilter(filter: string) {
    /**
      * Constante para decodificar el token
      */
    const helper = new JwtHelperService();
    /**
      * Variable que decodifica el toquen y captura el usuario logueado
      */
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    this.historial.getHistorial("", usuario).subscribe(data => {

      this.notificaciones = data;
      this.dataSource = new MatTableDataSource(this.notificaciones);
      //this.dataSource.sort = this.sort;
      this.dataSource.filter = filter.trim().toLocaleLowerCase();

      // En caso de error
    }, err => {


      // Error 401
      if (err.status == 401) {


      }

    });

    //this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
