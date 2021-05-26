import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from './../../../_model/mototaxi_model/Conductor';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BarraProgresoService } from '../../../_service/utilidades/barra-progreso.service';
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
   * Objeto que instancia una tabla de Angular Material cuyo tipo de dato es Conductor
   */
  dataSource = new MatTableDataSource<Conductor>();
  /**
   * Objeto array de tipo string el cual representa las columnas de la tabla
   */
  displayedColumns: string[];
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

  formCalcular= new FormGroup({
    destino1: new FormControl('', [
      Validators.required,
    ]),
    ubicacion1: new FormControl('', [
      Validators.required,
    ]),
    descripcion:new FormControl,
  });

  formSolicitar = new FormGroup({
    pag: new FormControl('', [
      Validators.required,
    ])
  });

  disableSelect = new FormControl(false);

  /**
  * Permite indicar el número de columnas de la grilla según el caso
  */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor(private servicioSolicitudService: ServicioSolicitudService,
              private barraProgresoService:BarraProgresoService,
              private _snackBar: MatSnackBar,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");

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

  calcular(){
    if(this.formCalcular.valid){
      var obj = {Destino:this.formCalcular.controls["destino1"].value,
                Ubicacion:this.formCalcular.controls["ubicacion1"].value};

      this.servicioSolicitudService.postCalcular(obj).subscribe(data => {
        this.kilometros = data["kilometros"];
        this.tarifa = data["pago"];
      });
    }
  }

  solicitarServicio(){
    // Constante que representa un objeto del módulo JwtHelperServic
    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var user = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    if(this.formSolicitar.valid){
      var obj = {idDestino:this.formCalcular.controls["destino1"].value,
                idUbicacion:this.formCalcular.controls["ubicacion1"].value,
                descripcionServicio:this.formCalcular.controls["descripcion"].value,
                kilometros:this.kilometros,
                tarifa:this.tarifa,
                pago:this.formSolicitar.controls["pag"].value,
                usuario:user};

      this.servicioSolicitudService.postSolicitarServicio(obj).subscribe(data => {
        this._snackBar.open('Por favor espera a que uno de nuestros conductores acepte tu solictud, Recibirá un correo notificando su servicio', 'Cancel  ', {
          duration: 5000
        });
        this.onResetForm();
      }, err => {
        if(err.status == 400){
          this._snackBar.open('Faltan datos por ingresar, verifique', 'Cancel', {
            duration: 3000
          });
        }
      });
    }
  }

  /**
   * Metodo que reinicia los componentes del form
   */
  onResetForm() {
    this.formCalcular.reset();
    this.formSolicitar.reset();
  }
}

