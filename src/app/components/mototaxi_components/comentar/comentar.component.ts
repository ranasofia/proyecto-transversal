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
   * Constructor de ComentarComponent
   * @param historial 
   * @param route 
   * @param barraProgreso 
   * @param snackBar 
   * @param routeer 
   */
  constructor(private historial:HistorialService,
              private route: ActivatedRoute,
              private barraProgreso: BarraProgresoService,
              private snackBar: MatSnackBar, 
              private routeer: Router) {}

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      comentario: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.FormComentar=this.createFormGroup();
    // Toma el id que viene desde la url
    this.route.params.subscribe((params) => {
      this.id=params.id;
      this.historial.getDatosRegistro(this.id).subscribe(data => {
        this.cliente = data["nombreCl"];
        this.conductor = data["conductor"];
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
    },err => {
        this.barraProgreso.progressBar.next("2");
        this.snackBar.open('error al comentar', 'Cancel', {
          duration: 3000
        })
    });
  }

  /**
   * Metodo que llama comentar y asigna los atributos
   */
  cargarComentario(){
    let notificacion:Notificacion;
    notificacion=new Notificacion();
    notificacion.id=this.id;
    var comentario = {ComentarioDeCliente: this.FormComentar.value["comentario"]};
    this.comentar(notificacion.id,comentario);
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
