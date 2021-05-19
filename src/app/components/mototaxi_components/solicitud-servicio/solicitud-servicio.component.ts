import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from './../../../_model/mototaxi_model/Conductor';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BarraProgresoService } from './../../../_service/barra-progreso.service';
import { ServicioSolicitudService } from './../../../_service/mototaxi_service/servicio-solicitud.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-solicitud-servicio',
  templateUrl: './solicitud-servicio.component.html',
  styleUrls: ['./solicitud-servicio.component.css']
})
export class SolicitudServicioComponent implements OnInit {

  /**
   * Indica cuantas columnas tiene la grilla en la que se posiciona cada producto
   */
  gridColumns = 3;

  /**
   * Objeto de tipo de array de la clase Conductor
   */
  conductor: Conductor[];

  /**
   * Objeto que instancia una tabla de Angular Material cuyo tipo de dato es Conductor
   */
   dataSource = new MatTableDataSource<Conductor>();

  /**
   * Objeto array de tipo string el cual representa las columnas de la tabla
   */
  displayedColumns: string[];

  /**
  * Permite indicar el número de columnas de la grilla según el caso
  */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  disableSelect = new FormControl(false);

  constructor(private servicioSolicitudService: ServicioSolicitudService,
    private barraProgresoService:BarraProgresoService) { }

  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");
    // Constante que representa un objeto del módulo JwtHelperServic
    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    //Metodo que traer el listado de conductores disponibles
    this.servicioSolicitudService.getConductoresDisponibles().subscribe(data => {
      this.conductor = data;
      this.dataSource = new MatTableDataSource(this.conductor);
    });

    //Nombre de las columas de la tabla
    this.displayedColumns = ['nombre', 'apellido'];

    this.barraProgresoService.progressBar.next("2");
  }

}
