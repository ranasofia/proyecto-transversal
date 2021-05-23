import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from './../../../_model/mototaxi_model/Conductor';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BarraProgresoService } from './../../../_service/barra-progreso.service';
import { ServicioSolicitudService } from './../../../_service/mototaxi_service/servicio-solicitud.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormGroupDirective,NgForm,Validators} from '@angular/forms';
import { Destino } from 'src/app/_model/mototaxi_model/Destino';
import { Pago } from 'src/app/_model/mototaxi_model/Pago';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitud-servicio',
  templateUrl: './solicitud-servicio.component.html',
  styleUrls: ['./solicitud-servicio.component.css']
})
export class SolicitudServicioComponent implements OnInit {
  /**
   * Indica cuantas columnas tiene la grilla en la que se posiciona cada producto
   */
  gridColumns = 3;
  /**
   * Objeto de tipo de array de la clase Conductor
   */
  conductor: Conductor[];
  /**
   * objeto que inicializa las variables del los select
   */
  selectDestino:Destino={id:0,lugarDestino:'',lugarUbicacion:''};
  selectUbicacion:Destino={id:0,lugarDestino:'',lugarUbicacion:''};
  selectPago:Pago={id:0,descripcion:''};
/**
 * objeto de tipo de array de la clase Destino
 */
  destino:Destino[];
  ubicacion:Destino[];
 /**
 * objeto de tipo de array de la clase Pago
 */
  pago:Pago[];

  /**
   * Variable que almacena el resultado de kilometro
   */
  kilometros:number;
  /**
   * Variable que almacena el resultado de tarifa
   */
  tarifa:number;
  /**
   * Objeto que instancia una tabla de Angular Material cuyo tipo de dato es Conductor
   */
  dataSource = new MatTableDataSource<Conductor>();

  /**
   * Objeto array de tipo string el cual representa las columnas de la tabla
   */
  displayedColumns: string[];


    formCalcular= new FormGroup({
      destino1: new FormControl('', [
        Validators.required,
      ] ),
      ubicacion1: new FormControl('', [
        Validators.required,
      ] ),
      descripcion:new FormControl,
    });

    formSolicitar = new FormGroup({
      kil: new FormControl,
      taf: new FormControl,
      pag: new FormControl('', [
        Validators.required,
      ])
    })

  /**
  * Permite indicar el número de columnas de la grilla según el caso
  */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  disableSelect = new FormControl(false);

  constructor(private servicioSolicitudService: ServicioSolicitudService,
    private barraProgresoService:BarraProgresoService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");
    // Constante que representa un objeto del módulo JwtHelperServic
    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];

    //Metodo que traer el listado de conductores disponibles
    this.servicioSolicitudService.getConductoresDisponibles().subscribe(data => {
      this.conductor = data;
      this.dataSource = new MatTableDataSource(this.conductor);
    });

    //Nombre de las columas de la tabla
    this.displayedColumns = ['nombre', 'apellido'];

    this.servicioSolicitudService.getDestino().subscribe(data=>{
      this.destino=data;
   
    });
    
    this.servicioSolicitudService.getUbicacion().subscribe(data=>{
      this.ubicacion=data;
   
    });

    this.servicioSolicitudService.getPago().subscribe(data=>{
      this.pago=data;
   
    });

    this.barraProgresoService.progressBar.next("2");
  }

  calcular(values){
    var obj = {Destino:values.destino1,Ubicacion:values.ubicacion1};

    this.servicioSolicitudService.postCalcular(obj).subscribe(data => {
      this.kilometros = data["kilometros"];
      this.tarifa = data["pago"];
    });
  }

  solicitarServicio(values){
    //if (this.formCalcular.valid && this.formSolicitar.valid) {
    var notificacion = new Notificacion();

    notificacion.idDestino = values.destino1;
    notificacion.idUbicacion = values.ubicacion1;
    notificacion.descripcionServicio = values.descripcion;
    notificacion.kilometro = values.kil;
    notificacion.tarifa = values.taf;
    notificacion.pago = values.pag;

    this.servicioSolicitudService.postSolicitarServicio(notificacion).subscribe(data => {
      console.log(notificacion);
      this._snackBar.open('Por favor espera a que uno de nuestros conductores acepte tu solictud, Recibirá un correo notificando su servicio', 'Cancel  ', {
        duration: 3000
      });
      this.onResetForm();
    });
  //}
  }

  /**
   * Método que borra las cadenas de texto del formulario de solicitud servicio
   */
   onResetForm() {
    this.formCalcular.reset();
    this.formSolicitar.reset();
  }

  /**
   * Permite iniciar el proceso de solicitud servicio
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
   solicitar(event: Event): any {
    event.preventDefault();

    this.solicitarServicio(event);

  }
}

