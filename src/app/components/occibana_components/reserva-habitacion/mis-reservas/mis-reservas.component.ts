import { DialogComentarComponent } from './dialog-comentar/dialog-comentar.component';
import { DialogCalificarComponent } from './dialog-calificar/dialog-calificar.component';
import { Hotel } from './../../../../_model/occibana_model/Hotel';
import { PanelHotelService } from './../../../../_service/occibana_service/panel-hotel.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DialogCancelarReservaComponent } from './dialog-cancelar-reserva/dialog-cancelar-reserva.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioOccibana } from './../../../../_model/occibana_model/UsuarioOccibana';
import { HotelService } from './../../../../_service/occibana_service/hotel.service';
import { environment } from './../../../../../environments/environment';
import { DatosPerfilService } from './../../../../_service/occibana_service/datos-perfil.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Decorador de MisReservasComponent
 */
@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
})
/**
 * Representa a la clase MisReservasComponent
 */
export class MisReservasComponent implements OnInit {
  /**
   * Variable almacena el token para decodificarlo
   */
  private helper: any = new JwtHelperService();

  /**
   * Variable que almacena el id del usuario
   */
  private usuario: UsuarioOccibana;

  /**
   * Variable que almacena la lista de reservas
   */
  reservas: any;

  /**
   * Variable que se le asigna el número de columnas en el FlexBox
   */
  gridColumns = 3;

  /**
   * Variable que almacena el objeto de tipo Hotel
   */
  hotel: Hotel;

  /**
   * Variable de tipo string que almacena el nombre del hotel
   */
  nombreHotel: string;

  /**
   * Constructor sobrecargado de la clase MisReservasComponent
   * @param perfilService
   * @param hotelService
   * @param dialog
   * @param configRating
   * @param panelHotel
   */
  constructor(
    private perfilService: DatosPerfilService,
    private hotelService: HotelService,
    private dialog: MatDialog,
    configRating: NgbRatingConfig,
    private panelHotel: PanelHotelService
  ) {
    configRating.readonly = true;
    configRating.max = 5;
  }

  /**
   * Implementación que se ejecuta una vez se inicie el MisReservasComponent
   */
  ngOnInit(): void {
    const token = this.helper.decodeToken(
      sessionStorage.getItem(environment.TOKEN)
    );
    this.cargarDatosPerfil(token.name);
  }

  /**
   * Método que obtiene la información del usuario que va a hacer la reserva
   */
  cargarDatosPerfil(nombreUsuario: string): void {
    this.perfilService.postCargaDatosPerfil(nombreUsuario).subscribe((data) => {
      this.usuario = data.datos;
      this.cargarMisReservas();
    });
  }

  /**
   * Método que se encarga de obtener la información de un hotel a partir de su id
   * @param idHotel
   */
  cargarDatosHotel(idHotel: number) {
    this.panelHotel.postInformacionHotel(idHotel).subscribe((data) => {
      this.hotel = data;
    });
  }

  /**
   * Método que carga todas la reservas vigentes que tiene un usuario
   */
  cargarMisReservas(): void {
    this.hotelService.reservaUsuario(this.usuario).subscribe((data) => {
      if (data == null || data == [] || data == undefined) {
        this.reservas = 'No tienes ninguna reserva actualmente';
      } else {
        this.reservas = data;
        for (let i = 0; i < this.reservas.length; i++) {
          this.cargarDatosHotel(this.reservas[i].idhotel);
        }
      }
    });
  }

  /**
   * Método que permite indicar el número de columnas de una grilla según el caso
   */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  /**
   * Método que se encarga de abrir el dialog de CancelarReservaComponent, en el cual
   * se cancelara cualquier reserva que tenga el usuario
   * @param id
   */
  cancelarReserva(id: number) {
    this.dialog.afterAllClosed.subscribe(() => this.ngOnInit());
    this.dialog.open(DialogCancelarReservaComponent, {
      data: { id },
    });
  }

  /**
   * Método que se encarga de abrir el dialog de ComentarComponent, en el cual
   * el usuario podrá comentar el servicio del hotel
   */
  comentarHotel() {
    this.dialog.afterAllClosed.subscribe(() => this.ngOnInit());
    this.dialog.open(DialogComentarComponent, {
      data: {
        idUsuario: this.usuario.id,
        idHotel: this.hotel.idhotel,
      },
    });
  }

  /**
   * Método que se encarga de abrir el dialog de CalificarComponent, en el cual
   * el usuario podrá calificar el servicio del hotel
   * @param idReserva
   */
  calificarHotel(idReserva: number) {
    this.dialog.afterAllClosed.subscribe(() => this.ngOnInit());
    this.dialog.open(DialogCalificarComponent, {
      data: {
        idReserva,
        idHotel: this.hotel.idhotel,
        idUsuario: this.usuario.id,
      },
    });
  }
}
