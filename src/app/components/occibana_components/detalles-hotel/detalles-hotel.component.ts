import { BarraProgresoService } from './../../../_service/utilidades/barra-progreso.service';
import { DatosPerfilService } from './../../../_service/occibana_service/datos-perfil.service';
import { PanelHotelService } from './../../../_service/occibana_service/panel-hotel.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/_model/occibana_model/Comentario';
import { Habitacion } from 'src/app/_model/occibana_model/Habitacion';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * Decorador de DetallesHotelComponent
 */
@Component({
  selector: 'app-detalles-hotel',
  templateUrl: './detalles-hotel.component.html',
  styleUrls: ['./detalles-hotel.component.css'],
})

/**
 * Representa la Clase DetallesHotelComponent
 */
export class DetallesHotelComponent implements OnInit {
  /**
   * Representan los datos cargados de todos lo comentarios
   */
  dataComentarios: MatTableDataSource<Comentario>;

  /**
   * Representa la lista de comentario que tiene un hotel
   */
  comentarios: Comentario[];

  /**
   * Representa la lista de habitación que tiene un hotel
   */
  habitaciones: Habitacion[];

  /**
   * Carga el token para decodificarlo
   */
  helper: any = new JwtHelperService();

  /**
   * Representa el nombre del usuario de la sesión
   */
  nombreUsuario: string;

  /**
   * Representa el id del hotel seleccionado
   */
  idHotel: number;

  /**
   * Representa el id de usuario de la sesión
   */
  idUsuario: number;

  /**
   * Representa la información del hotel seleccionado
   */
  hotelSeleccionado?: Hotel;

  /**
   * Constructor sobrecargado del componente de detalles del hotel
   */
  constructor(
    private serviceHotel: HotelService,
    private panelHotelService: PanelHotelService,
    private route: ActivatedRoute,
    configRating: NgbRatingConfig,
    private perfilService: DatosPerfilService,
    private barraProgreso: BarraProgresoService
  ) {
    configRating.readonly = true;
    configRating.max = 5;
  }

  /**
   * Implementación que se ejecuta una vez se inicie el DetallesHotelComponent
   */
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.idHotel = data.id;
    });
    this.cargarDatosHotel();
  }

  /**
   * Método que se encarga de cargar los datos del hotel seleccionado por el usuario
   */
  cargarDatosHotel(): void {
    this.barraProgreso.progressBar.next('1');
    this.panelHotelService.postInformacionHotel(this.idHotel).subscribe(
      (datos) => {
        this.hotelSeleccionado = datos;
        this.hotelSeleccionado.imagen =
          'https://www.occibanaisw.tk/' + this.hotelSeleccionado.imagen;
        this.obtenerComentariosHotel();
        this.obtenerHabitacionesHotel(this.idHotel);
        const token = this.helper.decodeToken(
          sessionStorage.getItem(environment.TOKEN)
        );
        this.nombreUsuario = token.name;
        this.cargarDatosPerfil();
        this.barraProgreso.progressBar.next('2');
      } /*
      (error) => {
        this.barraProgreso.progressBar.next('2');
        return this.router.navigate['/occibana/hoteles'];
      }*/
    );
  }

  /**
   * Método que se encarga de cargar los datos del usuario de la sesión activa
   */
  cargarDatosPerfil(): void {
    this.perfilService.postCargaDatosPerfil(this.nombreUsuario).subscribe(
      (data) => {
        this.idUsuario = data.datos.id;
      } /*,
      (error) => {
        return this.router.navigate['/occibana/hoteles'];
      }*/
    );
  }

  /**
   * Método que obtiene la lista de comentarios por cada hotel
   */
  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      (data) => {
        this.comentarios = data;
      } /*,
      (err) => {
        return this.router.navigate['/occibana/hoteles'];
      }*/
    );
  }

  /**
   * Método que obtiene la lista de habitaciones que tiene disponibles un hotel
   */
  obtenerHabitacionesHotel(idHotel: number): void {
    this.serviceHotel.postHabitacionesHotel(idHotel).subscribe(
      (data) => {
        this.habitaciones = data;
      } /*,
      (err) => {
        return this.router.navigate['/occibana/hoteles'];
      }*/
    );
  }
}
