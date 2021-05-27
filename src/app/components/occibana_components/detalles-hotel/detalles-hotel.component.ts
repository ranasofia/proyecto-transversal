import { BarraProgresoService } from './../../../_service/utilidades/barra-progreso.service';
import { ComentarioService } from './../../../_service/occibana_service/comentario.service';
import { UsuarioOccibana } from './../../../_model/occibana_model/UsuarioOccibana';
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
  styleUrls: ['./detalles-hotel.component.css']
})
export class DetallesHotelComponent implements OnInit {

  dataComentarios: MatTableDataSource<Comentario>;

  hotelSeleccionado: Hotel;

  comentarios: Comentario[];

  habitaciones: Habitacion[];

  helper: any = new JwtHelperService();

  nombreUsuario: string;

  value = 1;

  idHotel: number;

  idUsuario: number;

  /**
   * Variable que indica el formulario para el comentario
   */
  comentarioF: FormGroup;

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
    this.barraProgreso.progressBar.next("1");
    this.route.params.subscribe(data => {
      this.idHotel = data.id
      this.panelHotelService.postInformacionHotel(this.idHotel).subscribe(
        (data) => {
          this.hotelSeleccionado = data
          this.hotelSeleccionado.imagen = "https://www.occibanaisw.tk/" + this.hotelSeleccionado.imagen
          this.obtenerComentariosHotel();
          this.obtenerHabitacionesHotel(this.idHotel);
          let token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN))
          this.nombreUsuario = token.name
          this.cargarDatosPerfil()
          this.barraProgreso.progressBar.next("2");
        },
        (error) => {
          this.barraProgreso.progressBar.next("2");
          this.router.navigate[('/occibana/hoteles')]
        }
      )
    })

  }

  /**
   * Método que se encarga de configurar las validaciones del formulario comentario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({

      comentario: new FormControl(
        '', [
        Validators.required
      ])
    })
  }

  cargarDatosPerfil() {
    this.perfilService.postCargaDatosPerfil(this.nombreUsuario).subscribe(
      data => {
        this.idUsuario = data.datos.id
      },
      error => {
        this.router.navigate[('/occibana/hoteles')]
      }
    )
  }

  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      data => {
        this.comentarios = data
        for (var i = 0; i < this.comentarios.length; i++) {
          this.comentarios[i].fecha_comentario = moment().locale('es').calendar()
        }
      },
      err => {
        this.router.navigate[('/occibana/hoteles')]
      }
    )
  }

  obtenerHabitacionesHotel(idHotel: number): void {
    this.serviceHotel.postHabitacionesHotel(idHotel).subscribe(
      data => {
        this.habitaciones = data;

      },
      err => {
        this.router.navigate[('/occibana/hoteles')]
      }

    )
  }

  cargarComentario() {
    let comentario = this.comentarioF.value['comentario'];
    this.barraProgreso.progressBar.next("1");
    this.comentarioService.postComentar(this.idUsuario, comentario, this.idHotel).subscribe(
      data => {
        console.log(data);
        this.barraProgreso.progressBar.next("2");
      },
      error => {
        this.barraProgreso.progressBar.next("2");
        console.log(error);
      }
    )
  }

  comentarYcalificar(event: Event) {
    this.cargarComentario();
  }

}
