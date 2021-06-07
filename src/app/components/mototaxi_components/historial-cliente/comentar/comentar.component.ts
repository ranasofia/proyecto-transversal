import { MatSnackBar } from '@angular/material/snack-bar';
import { HistorialService } from 'src/app/_service/mototaxi_service/historial.service';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 * Decorador de ComentarComponent
 */
@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.component.html',
  styleUrls: ['./comentar.component.css']
})
export class ComentarComponent implements OnInit {
  /**
   * Se declara el formulario de comentario
   */
  FormComentar:FormGroup;
  /**
   * Variable que captura el idNotificación
   */
  id:number;
  /**
   * Variable que captura el nombre del cliente
   */
  cliente: string;
  /**
   * Variable que captura el nombre del conductor
   */
  conductor: string;
  /**
   * Variable que captura el comentario del cliente
   */
  comentarioDeCliente: string;

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
   createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      comentario: new FormControl('', [Validators.required])
    });
  }

 /**
  * Constructor de ComentarComponent
  * @param historial objeto que permite usar los servicios de comentar servicio
  * @param route permite Redireccionar a otro formulario
  * @param barraProgresoService  Permite mostrar la barra de progreso al ejecutar un servicio
  * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
  * @param routeer permite Redireccionar a otro formulario
  */
  constructor(private historial:HistorialService,
              private route: ActivatedRoute,
              private barraProgreso: BarraProgresoService,
              private snackBar: MatSnackBar,
              private routeer: Router) {
                this.FormComentar = this.createFormGroup();
              }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
    // Toma el id que viene desde la url
    this.route.params.subscribe((params) => {
      this.barraProgreso.progressBar.next("1");
      this.id=params.id;
      this.historial.getDatosRegistro(this.id).subscribe(data => {
        this.cliente = data["nombreCl"];
        this.conductor = data["conductor"];
        this.comentarioDeCliente = data["comentarioDeCliente"];
        this.barraProgreso.progressBar.next("2");
      })
    });
  }

  /**
   * Metodo que permite comentar el servicio
   * @param idNotificacion
   * @param comentario
   */
  comentar(idNotificacion:number,comentario:any){
    this.barraProgreso.progressBar.next("1");
    this.historial.putComentar(idNotificacion,comentario).subscribe(data=>{
      this.snackBar.open('El comentario a sido enviado', 'Cerrar', {
        duration: 3000
      })
      this.barraProgreso.progressBar.next("2");
      this.routeer.navigate(['/mototaxi/historialCliente']);
    });
  }

  /**
   * Metodo que llama comentar y asigna los atributos
   */
  cargarComentario(){
    let notificacion:Notificacion;
    notificacion=new Notificacion();
    notificacion.id=this.id;

    if(this.FormComentar.valid){
      var comentario = {ComentarioDeCliente: this.FormComentar.controls["comentario"].value};

      if(this.comentarioDeCliente == undefined){
        this.comentar(notificacion.id,comentario);
      }else if(this.comentarioDeCliente != undefined){
        this.snackBar.open('Ya ha realizado un comentario a este servicio', 'Cerrar', {
          duration: 3000
        })
      }
    }
  }

  /**
   *
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
   aceptar(event: Event): any {
    event.preventDefault();
    this.cargarComentario();
  }

}
