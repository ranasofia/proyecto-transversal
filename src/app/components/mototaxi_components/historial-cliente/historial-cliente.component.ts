import { MatSnackBar } from '@angular/material/snack-bar';
import { HistorialService } from 'src/app/_service/mototaxi_service/historial.service';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { Router, ActivatedRoute } from '@angular/router';
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
   * Constructor de HistorialClienteComponent
   * @param clienteService
   * @param router
   */
  constructor(private historial: HistorialService,
              private barraProgresoService: BarraProgresoService,
              private _snackBar: MatSnackBar,
              public route: ActivatedRoute) { }

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
      }
    });

    // Nombres de la columnas de la tabla
    this.displayedColumns = ['soy','conductor', 'destino', 'ubicacion', 'tarifa', 'fechaCarrera', 'comentario', 'comentar','conversacion','conversar'];

    this.barraProgresoService.progressBar.next("2");
  }

  /**
   * Método que se ejecuta cuando un componente hijo deja de estar activo
   * @param event variable que posee todos los datos del evento
   */
   onDeactivate(event) {
    this.ngOnInit();
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
      this.dataSource.filter = filter.trim().toLocaleLowerCase();
    });
  }
}
