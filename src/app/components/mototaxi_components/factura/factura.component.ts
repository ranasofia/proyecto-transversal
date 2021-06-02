import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { ServicioSolicitudService } from './../../../_service/mototaxi_service/servicio-solicitud.service';
import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

/**
 * Decorador de FacturaComponent
 */
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})

/**
 * Clase de HistorialClienteComponent
 */
export class FacturaComponent implements OnInit {

  /**
   * Variable que obtiene la fecha de la carrera
   */
  fechaCarrera: string;
  /**
   * Variable que obtiene el nombre del usuario
   */
  nombre: string;
  /**
   * Variable que obtiene el destino de la carrea
   */
  destino: string;
  /**
   * Variable que obtiene la ubicación de la carrera
   */
  ubicacion: string;
  /**
   * Variable que obtiene la tarifa de la carrea
   */
  tarifa: number;
  /**
   * Variable que obtiene el metodo de pago de la carrera
   */
  pago: string;

  /**
   * Constructor de FacturaComponent
   * @param servicioSolicitudService
   * @param barraProgresoService
   */
  constructor(private servicioSolicitudService: ServicioSolicitudService,
              private barraProgresoService: BarraProgresoService) { }

  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");
    /**
      * Constante para decodificar el token
      */
    const helper = new JwtHelperService();
    /**
      * Variable que decodifica el toquen y captura el usuario logueado
      */
    var user = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    //Metodo que trae los datos de la factura
    this.servicioSolicitudService.getFactura(user).subscribe(data =>{
      this.fechaCarrera = data["fechaCarrera"];
      this.nombre = data["nombreCl"];
      this.destino = data["destino"];
      this.ubicacion = data["ubicacion"];
      this.tarifa = data["tarifa"];
      this.pago = data["metodoPago"];
      this.barraProgresoService.progressBar.next("2");
    });
  }

  export() {

    const options = {
      filename: "FacturaMototaxi.pdf",
      image: { type: 'jpeg' },
      html2canvas: {scale: 2},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
    };
    const content: Element = document.getElementById('content');
    html2pdf().from(content).set(options).save();

  }
}
