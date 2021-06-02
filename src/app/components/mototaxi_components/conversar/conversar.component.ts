import { JwtHelperService } from '@auth0/angular-jwt';
import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { HistorialService } from 'src/app/_service/mototaxi_service/historial.service';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Decorador de ConversarComponent
 */
@Component({
  selector: 'app-conversar',
  templateUrl: './conversar.component.html',
  styleUrls: ['./conversar.component.css']
})
export class ConversarComponent implements OnInit {
  /**
   * Se declara el formulario de comentario
   */
  formConversar:FormGroup;
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
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
   createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      conversar: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Constructor de ConversarComponent
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
              private routeer: Router) { 
                this.formConversar = this.createFormGroup();
              }

  ngOnInit(): void {
    // Toma el id que viene desde la url
    this.route.params.subscribe((params) => {
      this.barraProgreso.progressBar.next("1");
      this.id=params.id;
      this.historial.getDatosRegistro(this.id).subscribe(data => {
        this.cliente = data["nombreCl"];
        this.conductor = data["conductor"];
        this.barraProgreso.progressBar.next("2");
      })
    });
  }

  /**
   * Metodo que permite conversar con el conductor del servicio
   * @param idNotificacion 
   * @param usuario 
   * @param conversar 
   */
  conversar(idNotificacion:number,usuario:string,conversar:any){
    this.barraProgreso.progressBar.next("1");
    this.historial.putConversar(idNotificacion,usuario,conversar).subscribe(data=>{
      this.snackBar.open('El mensaje a sido enviado', 'Cerrar', {
        duration: 3000
      })
      this.barraProgreso.progressBar.next("2");
      this.routeer.navigate(['/mototaxi/historialCliente']);
    });
  }

  /**
   * Metodo que llama conversar y asigna los atributos
   */
  cargarConversacion(){
    /**
      * Constante para decodificar el token
      */
    const helper = new JwtHelperService();
    /**
      * Variable que decodifica el toquen y captura el usuario logueado
      */
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    let notificacion:Notificacion;
    notificacion=new Notificacion();
    notificacion.id=this.id;
    
    if(this.formConversar.valid){
      var conversacion = {Conversacion: this.formConversar.value["conversar"]};
      this.conversar(notificacion.id,usuario,conversacion);
    }
  }

  /**
   *
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
    aceptar(event: Event): any {
    event.preventDefault();
    this.cargarConversacion();
  }

}
