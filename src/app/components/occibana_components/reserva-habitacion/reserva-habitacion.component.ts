import { Hotel } from './../../../_model/occibana_model/Hotel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
   * Variable que indica el formulario de reserva de hotel
   */
   reservaForm: FormGroup;

   informacionHotel: Hotel;

  /**
   * Constructor sobrecargado del componente de ReservarHabitación
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
    this.reservaForm = this.createFormGroup();

    this.route.params.subscribe( data => {
      const idHabitacion = data.id;
      this.obtenerInformacionHabitacion(idHabitacion);
      const token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
      const nombreUsuario = token.name;
      this.cargarDatosPerfil(nombreUsuario);

    });
  }

 /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
  createFormGroup(): FormGroup{
    return new FormGroup({
      id: new FormControl(),

      nombre: new FormControl(
        '', [
          Validators.required
        ]),
      apellido: new FormControl(
        '', [
          Validators.required
        ]),
      email: new FormControl(
        '', [
          Validators.required,
          Validators.email,
        ])
      });
    }
  /**
   * Método que obtiene toda la información de la habitación seleccionada a partir de su id
   */
  obtenerInformacionHabitacion(idHabitacion: number): void {
    this.panelHotelService.postInformacionHabitacion(idHabitacion).subscribe(
      (data) => {
        this.informacionHabitacion = data;
        console.log(data);
      },
      (error) => {

      }
    );
  }

  obtenerDatosHotel(idHotel: number): void {
    this.panelHotelService.postInformacionHotel(idHotel).subscribe(
      (data) => {
        this.informacionHotel = data;
      },
      (error) => {
        console.log("No sirve esa shit");
        
      }
    );
  }

  /**
   * Método que obtiene la información del usuario que va a hacer la reserva
   */
  cargarDatosPerfil(nombreUsuario: string): void {
    this.perfilService.postCargaDatosPerfil(nombreUsuario).subscribe(
      data => {
        this.usuario = data.datos
      },
      error => {
        console.log('Error al cargar el usuario');
      }
    );
  }

  /**
   * Método que creará una reserva nueva de una habitación de un hotel
   */
  realizarReserva(): void{
    
  }

  /**
   * Método que carga los datos que vienen desde el formulario
   */
  onSubmit(event: Event): void{
    event.preventDefault();
    this.realizarReserva();
  }
}
