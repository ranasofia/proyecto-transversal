import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

/**
 * Decorador de ServerErrorInterceptorService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que maneja la lógica para capturar y gestionar los errores que ocurran al momento de llamar un servicio
 */
export class ServerErrorInterceptorService implements HttpInterceptor {

  /**
   * Constructor de ServerErrorInterceptorService
   * @param snackBar oobjeto que se inyecta para mostrar mensajes que comuniquen información al usuario
   * @param router objeto que se inyecta para los redireccionamientos
   * @param barraProgresoService objeto que se inyecta para mostrar la barra de progreso
   */
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private barraProgresoService: BarraProgresoService) { }

  /**
   * Permite condicionar las acciones a ejecutar según el error capturado
   * @param req objeto que controla las peticiones Http
   * @param next objeto que gestiona las entregas de los interceptores
   * @returns handle
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error == true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }/*else{
          Entra al else si en los intentos el servicio funciona
        }*/
      }
    })).pipe(catchError((err) => {
      this.barraProgresoService.progressBar.next("2");

        if (err.status == 400 && err.error.message === "Correo y/o contraseña incorrecta") {
          //LoginComponent
          this.snackBar.open('El correo y/o contraseña son incorrectos', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "Usuario existente, porfavor intente con otro") {
          //RegistroComponent: Usuario existente
          this.snackBar.open('Usuario existente, porfavor intente con otro', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "Correo existente, porfavor intente con otro") {
          //RegistroComponent: Correo existente
          this.snackBar.open('Correo existente, porfavor intente con otro', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "El usuario no existe, por favor verifique") {
          //GenerarTokenRecuperacionComponent: Correo no existe
          this.snackBar.open('El usuario no existe, por favor verifique', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "Token Vencido") {
          //GenerarTokenRecuperacionComponent: Token generado aun activo
          this.snackBar.open('Ya generaste un token, por favor espera el tiempo indicado', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "error de conexion") {
          //GenerarTokenRecuperacionComponent: Error
          this.snackBar.open('Error', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "su token no es valido") {
          //RecuperarContraseñaComponent: Token no valido
          this.snackBar.open('Su token no es valido', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "Entradas incorrectas El nombre es requerido. El apellido es requerido. El celular es requerido. El correo es requerido. El usuario es requerido. El fechaNacimiento es requerido. El direccion es requerido. El cedula es requerido.") {
          //FormularioUsuariosComponent: Registrar usuario (entrega adicional)
          this.snackBar.open('No ha ingresado ningun dato', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "el usuario no existe") {
          //FormularioUsuariosComponent: Obtener usuario (entrega adicional)
          this.snackBar.open('El usuario no existe', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "revise las entradas") {
          //FormularioUsuariosComponent: Editar usuario (entrega adicional)
          this.snackBar.open('Revise las entradas', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "usuario no existe") {
          //FacturaComponent: factura cliente
          this.snackBar.open('Usuario no existe', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "no ha ingresado ningun dato ") {
          //SolicitudServicioComponent: solicitar servicio
          this.snackBar.open('No ha ingresado ningun dato', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "Correo incorrecto") {
          //Buscar usuario recuperar
          this.snackBar.open('Correo incorrecto o usuario no existe', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message === "surgio el siguente error: Object reference not set to an instance of an object.") {
          //Generar Recuperación Occibana
          this.snackBar.open('Error', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 400 && err.error.message.include('surgio el siguente error:')) {
          this.snackBar.open('Ocurrió un error al cargar los datos', 'Cerrar  ', {
            duration: 3000
          });
        } else if (err.status == 404) {
          this.router.navigate([`/error/${err.status}/Recurso no encontrado`]);
        } else if (err.status == 500) {
          this.router.navigate([`/error/${err.status}/Error en servidor`]);
        } else if (err.status == 401) {
          this.router.navigate([`/error/${err.status}/No autorizado`]);
        } else {
          this.router.navigate([`/error/${err.status}/Error inesperado`]);
        }

        return EMPTY;
      }));
  }
}
