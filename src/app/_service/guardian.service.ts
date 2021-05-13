import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClienteService } from './cliente.service';
import { Conversion } from 'src/app/_model/Conversion';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsuarioTransversalService } from './usuario-transversal.service';
import { Usuario } from '../_model/Usuario';
import { RegistroHCService } from './registro-hc.service';
import { RegistroLoginOccibanaService } from './registro-login-occibana.service';
import { RegistroSFService} from './superfast_service/registro-sf.service';


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private clienteService: ClienteService, private registroHCService: RegistroHCService, private registroLoginOccibanaService: RegistroLoginOccibanaService, private registroSFService: RegistroSFService, private usuarioTransversalService: UsuarioTransversalService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const helper = new JwtHelperService();
    var token = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    var url = state.url;

    if (token == undefined) {

      this.router.navigate(['login']);
      return false;

    }


    var usuarioIncompleto = new Usuario();
    usuarioIncompleto.correo = localStorage.getItem("correo");
    usuarioIncompleto.contrasena = localStorage.getItem("contrasena");

    var usuarioTransversal = null;

    this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

      usuarioTransversal = data;

    });

    for (var i = 0; i < 3; i++) {

      await this.delay(300);

      if (usuarioTransversal != undefined) {

        var usuarioConvertido = null;

        var servicioConvertido;

        if (url.toLocaleLowerCase().includes("hccauchos")) {

          servicioConvertido = this.registroHCService;
          usuarioConvertido = Conversion.convertirAHCCauchos(usuarioTransversal);

        } else if (url.toLocaleLowerCase().includes("occibana")) {

          servicioConvertido = this.registroLoginOccibanaService;
          usuarioConvertido = Conversion.convertirAOccibana(usuarioTransversal);

        } else if (url.toLocaleLowerCase().includes("superfast")) {

          return true;

        } else if (url.toLocaleLowerCase().includes("mototaxi")) {

          servicioConvertido = this.clienteService;
          usuarioConvertido = Conversion.convertirAMototaxi(usuarioTransversal);

        }

        servicioConvertido.getToken(usuarioConvertido).subscribe(data => {

          sessionStorage.setItem(environment.UBER_MOTOS, data);

        }, err => {

          if (err.status == 400) {

            servicioConvertido.registrar(usuarioConvertido).subscribe();

            servicioConvertido.getToken(usuarioConvertido).subscribe(data2 => {

              sessionStorage.setItem(environment.UBER_MOTOS, data2);

            })

          }

        })

        for (var j = 0; j < 3; j++) {

          await this.delay(300);

          if (sessionStorage.getItem(environment.UBER_MOTOS) != undefined) {

            return true;

          }

          if (i == 2) {

            this.router.navigate(['login']);

          }

        }



      }

      if (i == 2) {

        this.router.navigate(['login']);

      }

    }

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
