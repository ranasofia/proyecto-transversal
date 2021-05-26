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

  /**
   * Variable que indica el formulario para el comentario
   */
  comentarioF: FormGroup;

  constructor(
    private serviceHotel: HotelService,
    private panelHotelService: PanelHotelService,
    private route: ActivatedRoute,
    private router: Router,
    private configRating: NgbRatingConfig

  ) {
    configRating.readonly = true;
    configRating.max = 5;
    this.comentarioF = this.createFormGroup();
  }


  /**
   * Implementación que se ejecuta una vez se inicie el DetallesHotelComponent
   */
  ngOnInit(): void {

    this.route.params.subscribe(data => {
      let id = data.id
      this.panelHotelService.postInformacionHotel(id).subscribe(
        (data) => {
          this.hotelSeleccionado = data
          this.hotelSeleccionado.imagen = "https://www.occibanaisw.tk/" + this.hotelSeleccionado.imagen
          this.obtenerComentariosHotel();
          this.obtenerHabitacionesHotel(id);
          let token = this.helper.decodeToken(sessionStorage.getItem(environment.TOKEN))
          this.nombreUsuario = token.name
        },
        (error) => {
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

  obtenerComentariosHotel(): void {
    this.serviceHotel.postObtenerComentarios(this.hotelSeleccionado).subscribe(
      data => {
        this.comentarios = data
        for (var i = 0; i < this.comentarios.length; i++) {
          this.comentarios[i].fecha_comentario = moment().locale('es').calendar()
        }
      },
      err => {
        console.log('Ha ocurrido un error');

      }
    )
  }

  obtenerHabitacionesHotel(idHotel: number): void {
    this.serviceHotel.postHabitacionesHotel(idHotel).subscribe(
      data => {
        this.habitaciones = data;

      },
      err => {
        console.log('Ha ocurrido un error');
      }

    )
  }

  cargarComentario() {

  }

  comentarYcalificar(event: Event) {

  }

}
