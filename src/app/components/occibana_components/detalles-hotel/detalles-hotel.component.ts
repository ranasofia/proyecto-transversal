import { BarraProgresoService } from './../../../_service/utilidades/barra-progreso.service';
import { ComentarioService } from './../../../_service/occibana_service/comentario.service';
import { DatosPerfilService } from './../../../_service/occibana_service/datos-perfil.service';
import { PanelHotelService } from './../../../_service/occibana_service/panel-hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/_model/occibana_model/Comentario';
import * as moment from 'moment';
import { Habitacion } from 'src/app/_model/occibana_model/Habitacion';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalles-hotel',
  templateUrl: './detalles-hotel.component.html',
  styleUrls: ['./detalles-hotel.component.css'],
})
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

  value = 1;
  
  /**
   * Representa el id del hotel seleccionado
   */
  idHotel: number;
  
  /**
   * Representa el id de usuario de la sesión
   */
  idUsuario: number;

  /**
   * Variable que indica el formulario para el comentario
   */
  comentarioF: FormGroup;
  
  /**
   * Representa la información del hotel seleccionado
   */
  hotelSeleccionado?: Hotel;

  /**
   * Constructor sobrecargado de componente de detalles del hotel
   */
  constructor(
    private serviceHotel: HotelService,
    private panelHotelService: PanelHotelService,
    private route: ActivatedRoute,
    private router: Router,
    private configRating: NgbRatingConfig,
    private perfilService: DatosPerfilService,
    private comentarioService: ComentarioService,
    private barraProgreso: BarraProgresoService
  ) {
    configRating.readonly = true;
    configRating.max = 5;
    this.comentarioF = this.createFormGroup();
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
      },
      (error) => {
        this.barraProgreso.progressBar.next('2');
        return this.router.navigate['/occibana/hoteles'];
      }
    );
  }
  /**
   * Método que se encarga de configurar las validaciones del formulario comentario
   * @returns grupoFormulario
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      comentario: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Método que carga los datos del usuario de la sesión
   */
  cargarDatosPerfil(): void {
    this.perfilService.postCargaDatosPerfil(this.nombreUsuario).subscribe(
      (data) => {
        this.idUsuario = data.datos.id;
      },
      (error) => {
        return this.router.navigate['/occibana/hoteles'];
      }
    );
  }

  /**
   * Método que obtiene la lida de comentarios que tiene un hotel
   */
  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      (data) => {
        this.comentarios = data;
      },
      (err) => {
        return this.router.navigate['/occibana/hoteles'];
      }
    );
  }

  /**
   * Método que obtiene la lista de habitaciones que tiene disponibles un hotel
   */
  obtenerHabitacionesHotel(idHotel: number): void {
    this.serviceHotel.postHabitacionesHotel(idHotel).subscribe(
      (data) => {
        this.habitaciones = data;
      },
      (err) => {
        return this.router.navigate['/occibana/hoteles'];
      }
    );
  }
  
}
