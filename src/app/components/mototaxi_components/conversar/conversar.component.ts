import { JwtHelperService } from '@auth0/angular-jwt';
import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { HistorialService } from 'src/app/_service/mototaxi_service/historial.service';
import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversar',
  templateUrl: './conversar.component.html',
  styleUrls: ['./conversar.component.css']
})
export class ConversarComponent implements OnInit {

 formConversar:FormGroup;
 conductor:string;
 cliente:string;
 id:number;

  constructor(private historial:HistorialService,private route: ActivatedRoute,private barraProgreso: BarraProgresoService,private snackBar: MatSnackBar, private routeer: Router) { }

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
   createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      conversar: new FormControl(
        '', [Validators.required]),
      });
    }

  ngOnInit(): void {
    this.formConversar=this.createFormGroup();
    // Toma el id que viene desde la url
    this.route.params.subscribe((params) => {
      this.id=params.id;
      this.historial.getDatosRegistro(this.id).subscribe(data => {
        this.cliente = data["nombreCl"];
        this.conductor = data["conductor"];
      })
    });
  }

  conversar(idNotificacion:number,usuario:string,conversar:any){
    this.barraProgreso.progressBar.next("1");
    this.historial.putConversar(idNotificacion,usuario,conversar).subscribe(data=>{
      this.snackBar.open('El mensaje a sido enviado', 'Cerrar', {
        duration: 3000
      })
      this.barraProgreso.progressBar.next("2");
      this.routeer.navigate(['/mototaxi/historialCliente']);
    },err => {
        this.barraProgreso.progressBar.next("2");
        this.snackBar.open('error al conversar', 'Cancel', {
          duration: 3000
        })
    });
  }

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
    var conversacion = {Conversacion: this.formConversar.value["conversar"]};
    this.conversar(notificacion.id,usuario,conversacion);
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
