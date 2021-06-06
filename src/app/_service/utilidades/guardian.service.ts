import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { AdminService } from 'src/app/_service/superfast_service/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { Conversion } from 'src/app/_model/utilidades/Conversion';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { RegistroHCService } from 'src/app/_service/hccauchos_service/registro-hc.service';
import { RegistroLoginOccibanaService } from 'src/app/_service/occibana_service/registro-login-occibana.service';
import { RegistroSFService } from 'src/app/_service/superfast_service/registro-sf.service';

/**
 * Decorador de GuardianService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que permite condicionar el acceso a ciertas páginas teniendo en cuenta si se ha iniciado o no sesión y teniendo en cuenta a qué aplicación hace referencia la página
 */
export class GuardianService implements CanActivate {

  /**
   *
   * @param clienteService objeto que se inyecta para usar el servicio de registro e inicio de sesión de Mototaxi
   * @param registroHCService objeto que se inyecta para usar el servicio de registro de HCCauchos
   * @param registroLoginOccibanaService objeto que se inyecta para usar el servicio de registro e inicio de sesión de Occibana
   * @param registroSFService objeto que se inyecta para usar el servicio de registro de Superfast
   * @param adminService objeto que se inyecta para usar el servicio de inicio de sesión de Superfast
   * @param usuarioTransversalService objeto que se inyecta para usar el servicio de registro e inicio de sesión del Proyecto Transversal
   * @param router objeto que se inyecta para los redireccionamientos
   * @param loginHC objeto que se inyecta para el inicio de sesión de HCCauchos
   * @param barraProgresoService objeto que se inyecta para mostrar la barra de progreso
   */
  constructor(private clienteService: ClienteService,
    private registroHCService: RegistroHCService,
    private registroLoginOccibanaService: RegistroLoginOccibanaService,
    private registroSFService: RegistroSFService,
    private adminService: AdminService,
    private usuarioTransversalService: UsuarioTransversalService,
    private router: Router,
    private loginHC: LoginHCService,
    private barraProgresoService: BarraProgresoService) { }

  /**
   * Se encarga de la lógica para permitir, denegar y gestionar el acceso a las páginas que necesiten restricción de token
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.barraProgresoService.progressBar.next("1");
    await this.delay(2000);
    this.barraProgresoService.progressBar.next("2");

    const helper = new JwtHelperService();
    var token = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    var url = state.url;

    if (token == undefined) {

      this.router.navigate(['login']);
      return false;

    }


    var usuarioIncompleto = new Usuario();
    usuarioIncompleto.correo = token.email;
    usuarioIncompleto.usuario = token.name;

    var usuarioTransversal = null;

    this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

      usuarioTransversal = data;

    });

    for (var i = 1; i <= 100; i++) {

      await this.delay(300);

      if (usuarioTransversal != undefined) {

        var usuarioConvertido = null;

        var servicioConvertido;
        var cadenaSesion;

        if (url.toLocaleLowerCase().includes("hccauchos")) {

          servicioConvertido = this.loginHC;
          usuarioConvertido = Conversion.convertirAHCCauchos(usuarioTransversal);
          cadenaSesion = environment.TOKEN_HCCAUCHOS;

        } else if (url.toLocaleLowerCase().includes("occibana")) {

          servicioConvertido = this.registroLoginOccibanaService;
          usuarioConvertido = Conversion.convertirAOccibana(usuarioTransversal);
          cadenaSesion = environment.TOKEN_OCCIBANA;

        } else if (url.toLocaleLowerCase().includes("superfast")) {

          servicioConvertido = this.adminService;
          usuarioConvertido = Conversion.convertirASuperFast(usuarioTransversal);
          cadenaSesion = environment.TOKEN_SUPERFAST;

        } else if (url.toLocaleLowerCase().includes("mototaxi")) {

          servicioConvertido = this.clienteService;
          usuarioConvertido = Conversion.convertirAMototaxi(usuarioTransversal);
          cadenaSesion = environment.TOKEN_MOTOTAXI;

        } else {

          return true;

        }

        servicioConvertido.getToken(usuarioConvertido).subscribe(data => {

          sessionStorage.setItem(cadenaSesion, data);

        }, err => {

          if (err.status == 400 || err.status == 401) {
            let servicioRegistroConvertido;
            if (url.toLocaleLowerCase().includes("hccauchos")) {

              servicioRegistroConvertido = this.registroHCService;

            } else if (url.toLocaleLowerCase().includes("occibana")) {

              servicioRegistroConvertido = this.registroLoginOccibanaService;

            } else if (url.toLocaleLowerCase().includes("superfast")) {

              servicioRegistroConvertido = this.registroSFService;

            } else if (url.toLocaleLowerCase().includes("mototaxi")) {

              servicioRegistroConvertido = this.clienteService;

            }

            servicioRegistroConvertido.registrar(usuarioConvertido).subscribe(data => {

              servicioConvertido.getToken(usuarioConvertido).subscribe(data2 => {

                sessionStorage.setItem(cadenaSesion, data2);

              })

            });

          }

        })

        for (var j = 1; j <= 100; j++) {



          await this.delay(300);

          if (sessionStorage.getItem(cadenaSesion) != undefined) {

            return true;

          }

          if (j == 100) {

            this.router.navigate(['login']);

          }

        }



      }

      if (i == 100) {

        this.router.navigate(['login']);

      }

    }

  }

  /**
   * Permite detener la ejecución por un tiempo estipulado
   * @param ms variable que indica el tiempo a detener la ejecución
   * @returns promesa
   */
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
