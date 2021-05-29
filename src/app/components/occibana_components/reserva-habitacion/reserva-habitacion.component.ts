import { Reserva } from './../../../_model/occibana_model/Reserva';
import { UsuarioOccibana } from './../../../_model/occibana_model/UsuarioOccibana';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment.prod';
import { DatosPerfilService } from './../../../_service/occibana_service/datos-perfil.service';
import { Habitacion } from './../../../_model/occibana_model/Habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelHotelService } from './../../../_service/occibana_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';

/**
 * Decorador de Component
 */
@Component({
  selector: 'app-reserva-habitacion',
  templateUrl: './reserva-habitacion.component.html',
  styleUrls: ['./reserva-habitacion.component.css']
})

/**
 * Componente de reservar una habitación
 */
export class ReservaHabitacionComponent implements OnInit {

  /**
   * Almacena la información de la habitación seleccionada
   */
  informacionHabitacion: Habitacion;

  /**
   * Almacena el token para decodificarlo
   */
  helper: any = new JwtHelperService();

  /**
   * Almacena la información del usuario que va a hacer la reserva
   */
  usuario: UsuarioOccibana;

  /**
   * Almacena la información de la reserva
   */
  reseva: Reserva;

  /**
   * Constructor sobrecargado del componente de ReservarHabitación
   * @param panelHotelService 
   * @param route 
   * @param perfilService 
   * @param router 
   */
  constructor(
    private panelHotelService: PanelHotelService,
    private route: ActivatedRoute,
    private perfilService: DatosPerfilService,
    private router: Router
  ) { }

  /**
   * Implementación que se ejecuta una vez se inicie el HistorialClienteComponent
   */
  ngOnInit(): void {
    this.route.params.subscribe( data => {
      let idHabitacion = data.id
      this.obtenerInformacionHabitacion(idHabitacion)
      let token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN))
      let nombreUsuario = token.name
      this.cargarDatosPerfil(nombreUsuario)
    });
  }

  /**
   * Método que obtiene toda la información de la habitación seleccionada a partir de su id
   * @param idHabitacion 
   */
  obtenerInformacionHabitacion(idHabitacion: number): void {
    this.panelHotelService.postInformacionHabitacion(idHabitacion).subscribe(
      (data) => {
        this.informacionHabitacion = data
      },
      (error) => {

      }
    )
  }

  /**
   * Método que obtiene la información del usuario que va a hacer la reserva
   * @param nombreUsuario 
   */
  cargarDatosPerfil(nombreUsuario: string) {
    this.perfilService.postCargaDatosPerfil(nombreUsuario).subscribe(
      data => {
        this.usuario = data.datos
      },
      error => {
        this.router.navigate[('/occibana/hoteles')]
      }
    )
  }

  /**
   * Método que creará una reserva nueva de una habitación de un hotel
   */
  realizarReserva() {
    
  }

  /**
   * Método que carga los datos que vienen desde el formulario
   * @param event 
   */
  onSubmit(event: Event) {
    event.preventDefault();
    this.realizarReserva();
  }
}
