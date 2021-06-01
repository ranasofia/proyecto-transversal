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

  constructor(
    private router: Router,
    private perfilService: DatosPerfilService,
    private hotelService: HotelService
  ) {

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

  /**
   * Método que carga todas la reservas que tiene un usuario de forma vigente
   */
  cargarMisReservas(): void {
    this.hotelService.reservaUsuario(this.usuario).subscribe(data => {
      console.log(data);
      if (data == null || data == [] || data == undefined) {
        this.reservas = "No tienes ninguna reserva actualmente";
      } else {
        this.reservas = data;
      }
    })
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
