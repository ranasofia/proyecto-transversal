import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { AdminService } from './superfast_service/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClienteService } from './mototaxi_service/cliente.service';
import { Conversion } from 'src/app/_model/Conversion';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsuarioTransversalService } from './usuario-transversal.service';
import { Usuario } from '../_model/Usuario';
import { RegistroHCService } from './hccauchos_service/registro-hc.service';
import { RegistroLoginOccibanaService } from './occibana_service/registro-login-occibana.service';
import { RegistroSFService} from './superfast_service/registro-sf.service';


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private clienteService: ClienteService, 
              private registroHCService: RegistroHCService, 
              private registroLoginOccibanaService: RegistroLoginOccibanaService, 
              private registroSFService: RegistroSFService,
              private adminService: AdminService,
              private usuarioTransversalService: UsuarioTransversalService, 
              private router: Router,
              private loginHC: LoginHCService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

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

    for (var i = 0; i < 3; i++) {

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
            console.log(usuarioConvertido);
            servicioRegistroConvertido.registrar(usuarioConvertido).subscribe();

            servicioConvertido.getToken(usuarioConvertido).subscribe(data2 => {

              sessionStorage.setItem(cadenaSesion, data2);

            })

          }

        })

        for (var j = 0; j < 3; j++) {

          await this.delay(300);

          if (sessionStorage.getItem(cadenaSesion) != undefined) {

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
