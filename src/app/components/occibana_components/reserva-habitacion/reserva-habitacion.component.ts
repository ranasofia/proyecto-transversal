import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel } from './../../../_model/occibana_model/Hotel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva } from './../../../_model/occibana_model/Reserva';
import { UsuarioOccibana } from './../../../_model/occibana_model/UsuarioOccibana';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { DatosPerfilService } from './../../../_service/occibana_service/datos-perfil.service';
import { Habitacion } from './../../../_model/occibana_model/Habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelHotelService } from './../../../_service/occibana_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
/**
 * Decorador de Component
 */
@Component({
  selector: 'app-reserva-habitacion',
  templateUrl: './reserva-habitacion.component.html',
  styleUrls: ['./reserva-habitacion.component.css'],
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
  reserva?: Reserva;

  /**
   * Variable que indica el formulario de reserva de hotel
   */
  reservaForm: FormGroup;

  /**
   * Variable que indica el formulario del rango de fecha
   */
  rangoFechas: FormGroup;

  /**
   * Representa la información del hotel en donde se va a hacer la reserva
   */
  informacionHotel: Hotel;

  /**
   * Almacena la fecha de llegada que se digita para buscar disponibilidad
   */
  fechaLlegada: Date;

  /**
   * Almacena la fecha de salida que se digita para buscar disponibilidad
   */
  fechaSalida: Date;

  /**
   *
   */
  isDisabled: boolean;

  medioPagoSeleccionado: string;

  mediosPago: string[] = ['Efectivo', 'Tarjeta'];

  /**
   * Constructor sobrecargado del componente de ReservarHabitación
   */
  constructor(
    private panelHotelService: PanelHotelService,
    public route: ActivatedRoute,
    private perfilService: DatosPerfilService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService,
  ) {}

  /**
   * Implementación que se ejecuta una vez se inicie el HistorialClienteComponent
   */
  ngOnInit(): void {
    this.reservaForm = this.createFormGroup();
    this.rangoFechas = this.createFormFechas();
    this.isDisabled = true;
    this.barraProgreso.progressBar.next('1');
    this.route.params.subscribe((data) => {
      const idHabitacion = data['id'];
      this.obtenerInformacionHabitacion(idHabitacion);
      const token = this.helper.decodeToken(
        sessionStorage.getItem(environment.TOKEN)
      );
      const nombreUsuario = token.name;
      this.cargarDatosPerfil(nombreUsuario);
      this.barraProgreso.progressBar.next('2');
    });
  }

  createFormFechas(): FormGroup {
    return new FormGroup({
      fechaLlegada: new FormControl('', Validators.required),
      fechaSalida: new FormControl('', Validators.required),
    });
  }

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(),

      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  /**
   * Método que obtiene toda la información de la habitación seleccionada a partir de su id
   */
  obtenerInformacionHabitacion(idHabitacion: number): void {
    this.panelHotelService
      .postInformacionHabitacion(idHabitacion)
      .subscribe((data) => {
        this.informacionHabitacion = data;
        this.obtenerDatosHotel(data.idhotel);
      });
  }

  obtenerDatosHotel(idHotel: number): void {
    this.panelHotelService.postInformacionHotel(idHotel).subscribe((data) => {
      this.informacionHotel = data;
    });
  }

  /**
   * Método que obtiene la información del usuario que va a hacer la reserva
   */
  cargarDatosPerfil(nombreUsuario: string): void {
    this.perfilService.postCargaDatosPerfil(nombreUsuario).subscribe((data) => {
      this.usuario = data.datos;
      this.reservaForm = new FormGroup({
        id: new FormControl(),
        nombre: new FormControl(
          {
            value: data.datos.nombre,
            disabled: true,
          },
          [Validators.required]
        ),
        apellido: new FormControl(
          {
            value: data.datos.apellido,
            disabled: true,
          },
          [Validators.required]
        ),
        email: new FormControl('', [Validators.required, Validators.email]),
      });
    });
  }

  buscarDisponiblidad(): void {
    this.fechaLlegada = this.rangoFechas.value['fechaLlegada'];
    this.fechaSalida = this.rangoFechas.value['fechaSalida'];
    this.barraProgreso.progressBar.next('1');
    this.panelHotelService
      .buscarDisponibilidad(
        this.informacionHotel.idhotel,
        this.fechaSalida.toJSON(),
        this.fechaLlegada.toJSON(),
        this.informacionHabitacion
      )
      .subscribe((data) => {
        this._snackBar.open(data.mensaje, 'Cancel', {
          duration: 4000,
        });
        if (
          data.mensaje == 'habitación disponible para las fechas selccionadas'
        ) {
          this.isDisabled = false;
        }
        this.barraProgreso.progressBar.next('2');
      }/*,
      (error) => {
        this.barraProgreso.progressBar.next('2');
      }*/
      );
  }

  onDisponibilidad(event: Event): void {
    event.preventDefault();
    this.buscarDisponiblidad();
  }
  /**
   * Método que creará una reserva nueva de una habitación de un hotel
   */
  realizarReserva(): void {
    let reserva = new Reserva();

    reserva.idusuario = this.usuario.id;
    reserva.numpersona = this.informacionHabitacion.numpersonas.toString();
    reserva.fecha_llegada = this.fechaLlegada.toJSON();
    reserva.fecha_salida = this.fechaSalida.toJSON();
    reserva.nombre = this.usuario.nombre;
    reserva.apellido = this.usuario.apellido;
    reserva.correo = this.usuario.correo;
    reserva.idhotel = this.informacionHotel.idhotel;
    reserva.mediopago = this.medioPagoSeleccionado;
    reserva.id_habitacion = this.informacionHabitacion.id;
    reserva.precioNoche = this.informacionHabitacion.precio;
    this.barraProgreso.progressBar.next('1');
    this.panelHotelService
      .postReservarHospedaje(reserva, this.usuario.usuario)
      .subscribe((data) => {
        this._snackBar.open('Su reserva se realizó satifactoriamente.', 'OK', {
          duration: 2000,
        });
        this.barraProgreso.progressBar.next('2');
      },
      (error) => {
        this.barraProgreso.progressBar.next('2');
      });
  }

  /**
   * Método que carga los datos que vienen desde el formulario
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.realizarReserva();
  }

  onMisReservas(): void {
    this.router.navigate(['/occibana/hoteles/reservaHabitacion/' + this.informacionHabitacion?.id, 'misReservas']);
  }
}
