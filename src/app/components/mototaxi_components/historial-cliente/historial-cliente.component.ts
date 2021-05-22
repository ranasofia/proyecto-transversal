import { BarraProgresoService } from './../../../_service/barra-progreso.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioMototaxi } from 'src/app/_model/mototaxi_model/UsuarioMototaxi';
import { MatSort, MatSortModule } from '@angular/material/sort';

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

  /**
   * Constructor que iniciliza las variables globales de HistorialClienteComponent
   * @param clienteService
   * @param router
   */
  constructor(private clienteService: ClienteService, private router: Router,
    private barraProgresoService: BarraProgresoService) { }

  /**
   * Implementación que se ejecuta una vez se inicie el HistorialClienteComponent
   */
  ngOnInit(): void {

    this.barraProgresoService.progressBar.next("1");
    // Constante que representa un objeto del módulo JwtHelperServic
    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];


    // Método que traer el historial del cliente
    this.clienteService.getHistorial("", usuario).subscribe(data => {

      this.notificaciones = data;
      this.dataSource = new MatTableDataSource(this.notificaciones);
      this.dataSource.sort = this.sort;

      // En caso de error
    }, err => {


      // Error 401
      if (err.status == 401) {


      }

    });


    // Nombres de la columnas de la tabla
    this.displayedColumns = ['conductor', 'ubicacion', 'destino', 'tarifa'];

    this.barraProgresoService.progressBar.next("2");
  }

  /**
   * Método que se encarga de filtrar una cadena de texto en el data source
   * que se obtiene a partir del input de búsqueda
   * @param filter cadena de texto de llega desde el input de búsqueda
   */
  dataFilter(filter: string) {
    // Filtrar con cadena de texto convertida en minúsculas

    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    this.clienteService.getHistorial("", usuario).subscribe(data => {

      this.notificaciones = data;
      this.dataSource = new MatTableDataSource(this.notificaciones);
      this.dataSource.sort = this.sort;
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
