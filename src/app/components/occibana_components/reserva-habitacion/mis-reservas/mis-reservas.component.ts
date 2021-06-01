import { DialogCalificarComponent } from './dialog-calificar/dialog-calificar.component';
import { Hotel } from './../../../../_model/occibana_model/Hotel';
import { ComentarioService } from './../../../../_service/occibana_service/comentario.service';
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

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  /**
   * Almacena el token para decodificarlo
   */
  private helper: any = new JwtHelperService();

  /**
   * Almacena el id del usuario
   */
  private usuario: UsuarioOccibana;

  reservas: any;

  gridColumns = 3;

  hotel: Hotel;

  nombreHotel: string;

  constructor(
    private router: Router,
    private perfilService: DatosPerfilService,
    private hotelService: HotelService,
    private dialog: MatDialog,
    private configRating: NgbRatingConfig,
    private panelHotel: PanelHotelService
  ) {
    configRating.readonly = true;
    configRating.max = 5;
  }

  ngOnInit(): void {
    const token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN))
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

  cargarDatosHotel(idHotel: number) {
    this.panelHotel.postInformacionHotel(idHotel).subscribe(
      data => {
        this.hotel = data;
      }
    )
  }

  /**
   * Método que carga todas la reservas que tiene un usuario de forma vigente
   */
  cargarMisReservas(): void {
    this.hotelService.reservaUsuario(this.usuario).subscribe(data => {
      if (data == null || data == [] || data == undefined) {
        this.reservas = "No tienes ninguna reserva actualmente";
      } else {
        this.reservas = data;
        for (let i = 0; i < this.reservas.length; i++) {
          this.cargarDatosHotel(this.reservas[i].idhotel)
        }  
      }
    })
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  cancelarReserva(id:number) {
    this.dialog.afterAllClosed.subscribe(data => this.ngOnInit());
    this.dialog.open(DialogCancelarReservaComponent, {
      data: {id: id}
    })
  }

  comentarHotel() {

  }

  calificarHotel(idReserva: number) {
    this.dialog.afterAllClosed.subscribe(data => this.ngOnInit());
    this.dialog.open(DialogCalificarComponent, {
      data: {
        idReserva: idReserva,
        idHotel: this.hotel.idhotel,
        idUsuario: this.usuario.id
      }
    });
  }
}
