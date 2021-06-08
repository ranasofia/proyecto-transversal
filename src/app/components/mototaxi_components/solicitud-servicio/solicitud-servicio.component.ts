import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from './../../../_model/mototaxi_model/Conductor';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BarraProgresoService } from '../../../_service/utilidades/barra-progreso.service';
import { ServicioSolicitudService } from './../../../_service/mototaxi_service/servicio-solicitud.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Destino } from 'src/app/_model/mototaxi_model/Destino';
import { Pago } from 'src/app/_model/mototaxi_model/Pago';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Decorador de SolicitudServicioComponent
 */
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
   * Es el formulario que maneja los datos de origen y destino del servicio
   */
  formCalcular: FormGroup;
  /**
   * Es el formulario de solicitud de servicio
   */
  formSolicitar: FormGroup;
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
   * objeto que inicializa la el select de destino
   */
  selectDestino: Destino = { id: 0, lugarDestino: '', lugarUbicacion: '' };
  /**
   * objeto que inicializa la el select de ubicación
   */
  selectUbicacion: Destino = { id: 0, lugarDestino: '', lugarUbicacion: '' };
  /**
   * objeto que inicializa la el select de pago
   */
  selectPago: Pago = { id: 0, descripcion: '' };
  /**
    * objeto de tipo de array de la clase Destino para asignar los destinos
    */
  destino: Destino[];
  /**
    * objeto de tipo de array de la clase Destino para asignar las ubicaciones
    */
  ubicacion: Destino[];
  /**
    * objeto de tipo de array de la clase Pago
    */
  pago: Pago[];
  /**
   * Variable que almacena el resultado de kilometro
   */
  kilometros: number;
  /**
   * Variable que almacena el resultado de tarifa
   */
  tarifa: number;

  /**
   * Permite configurar las validaciones del formulario para destino y ubicación
   * @returns grupoFormulario
   */
  createFormGroupCalcular() {
    return new FormGroup({
      destino1: new FormControl('', [Validators.required]),
      ubicacion1: new FormControl('', [Validators.required,
      ValidacionesPropias.verificacionSolicitud
      ]),

      descripcion: new FormControl
    });
  }
  /**
   * Permite configurar las validaciones del formulario para solicitar el servicio
   * @returns grupoFormulario
   */
  createFormGroupSolicitar() {
    return new FormGroup({
      pag: new FormControl('', [Validators.required])
    });
  }

  /**
   * Deshabilita los formularios
   */
  disableSelect = new FormControl(false);

  /**
  * Permite indicar el número de columnas de la grilla según el caso
  */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  /**
   * Constructor de SolicitarServicioComponent
   * @param servicioSolicitudService objeto que permite usar los servicios de  servicio solicitud
   * @param barraProgresoService Permite mostrar la barra de progreso al ejecutar un servicio
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   * @param route permite Redireccionar a otro formulario
   * @param changeDetectorRef permite detectar cambios en los formularios
   */
  constructor(private servicioSolicitudService: ServicioSolicitudService,
    private barraProgresoService: BarraProgresoService,
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef) {
    this.formCalcular = this.createFormGroupCalcular();
    this.formSolicitar = this.createFormGroupSolicitar();
  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
    this.barraProgresoService.progressBar.next("1");

    //Metodo que traer el listado de conductores disponibles
    this.servicioSolicitudService.getConductoresDisponibles().subscribe(data => {
      this.conductor = data;
      this.dataSource = new MatTableDataSource(this.conductor);
    });

    //Nombre de las columas de la tabla
    this.displayedColumns = ['nombre', 'apellido'];

    this.servicioSolicitudService.getDestino().subscribe(data => {
      this.destino = data;
    });

    this.servicioSolicitudService.getUbicacion().subscribe(data => {
      this.ubicacion = data;
    });

    this.servicioSolicitudService.getPago().subscribe(data => {
      this.pago = data;
    });

    this.barraProgresoService.progressBar.next("2");
  }

  /**
   * Metodo que calcula la tarifa y pago del servicio
   */
  calcular() {
    if (this.formCalcular.valid) {
      var obj = {
        Destino: this.formCalcular.controls["destino1"].value,
        Ubicacion: this.formCalcular.controls["ubicacion1"].value
      };

      this.servicioSolicitudService.postCalcular(obj).subscribe(data => {
        this.kilometros = data["kilometros"];
        this.tarifa = data["pago"];
      });
    }
  }

  /**
   * Metodo que permite solicitar el servicio
   */
  solicitarServicio() {
    // Constante que representa un objeto del módulo JwtHelperServic
    const helper = new JwtHelperService();

    // variable que obtiene el nombre del usuario a partir del token
    var user = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    if (this.formSolicitar.valid) {
      var obj = {
        idDestino: this.formCalcular.controls["destino1"].value,
        idUbicacion: this.formCalcular.controls["ubicacion1"].value,
        descripcionServicio: this.formCalcular.controls["descripcion"].value,
        kilometros: this.kilometros,
        tarifa: this.tarifa,
        pago: this.formSolicitar.controls["pag"].value,
        usuario: user
      };

      this.servicioSolicitudService.postSolicitarServicio(obj).subscribe(data => {
        this._snackBar.open('Por favor espera a que uno de nuestros conductores acepte tu solictud, Recibirá un correo notificando su servicio', 'Cancel  ', {
          duration: 5000
        });
        this.onResetForm();
      });
    }
  }

  /**
   * Metodo que reinicia los componentes del form
   */
  onResetForm() {
    this.formCalcular.reset();
    this.formSolicitar.reset();

    Object.keys(this.formCalcular.controls).forEach(key => {
      this.formCalcular.get(key).setErrors(null);
    });

    Object.keys(this.formSolicitar.controls).forEach(key => {
      this.formSolicitar.get(key).setErrors(null);
    });

  }
}

