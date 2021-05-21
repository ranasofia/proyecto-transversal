import { environment } from 'src/environments/environment';
import { MasterComponent } from './components/master/master.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HistorialClienteComponent } from './components/mototaxi_components/historial-cliente/historial-cliente.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from './components/registro/registro.component';
import { CatalogoSuperFastComponent } from './components/superfast_components/catalogo-super-fast/catalogo-super-fast.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from './components/generar-token-recuperar/generar-token-recuperar.component';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { CatalogoHcCauchosComponent } from './components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UsuarioTransversalService } from './_service/usuario-transversal.service';
import { Usuario } from './_model/Usuario';
import { AdminService } from './_service/superfast_service/admin.service';
import { Conversion } from './_model/Conversion';
import { ClienteService } from './_service/mototaxi_service/cliente.service';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

import { SolicitudServicioComponent } from './components/mototaxi_components/solicitud-servicio/solicitud-servicio.component';
import { DetallesHotelComponent } from './components/occibana_components/detalles-hotel/detalles-hotel.component';
import { HccauchosCarritoComponent } from './components/hccauchos_componets/hccauchos-carrito/hccauchos-carrito.component';

export function jwtOptionsFactory(usuarioTransversalService: UsuarioTransversalService, adminService: AdminService, clienteService: ClienteService) {
  return {
    tokenGetter: (request) => {

      let tk: string;


      if (!request.url.includes("usuario/login") && !request.url.includes("login/login") && !request.url.includes("cliente/logincliente") && !request.url.includes("registroLogin/postIngresoLogin") && !request.url.includes("Registrar/PostInsertar_Usuario")) {

        const helper = new JwtHelperService();

        let usuarioIncompleto = new Usuario();
        usuarioIncompleto.correo = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).email;
        usuarioIncompleto.usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).name;

        if (request.url.includes('www.ubermotosisw.tk/api/usuario')) {

          tk = sessionStorage.getItem(environment.TOKEN);

          if (helper.isTokenExpired(tk)) {

            usuarioTransversalService.getToken(usuarioIncompleto).subscribe(data => {

              sessionStorage.setItem(environment.TOKEN, data);
              tk = sessionStorage.getItem(environment.TOKEN);

            })

          }

        } else if (request.url.includes('52.67.179.68')) {

          tk = sessionStorage.getItem(environment.TOKEN_SUPERFAST);

          if (helper.isTokenExpired(tk)) {

            usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

              var usuarioConvertido = Conversion.convertirASuperFast(data);

              adminService.getToken(usuarioConvertido).subscribe(data => {

                sessionStorage.setItem(environment.TOKEN_SUPERFAST, data);
                tk = sessionStorage.getItem(environment.TOKEN_SUPERFAST);

              })

            });
          }

        } else if (request.url.includes('18.224.240.8')) {
          tk = sessionStorage.getItem(environment.TOKEN_HCCAUCHOS);
        } else if (request.url.includes('ubermotosisw')) {
          tk = sessionStorage.getItem(environment.TOKEN_MOTOTAXI);

          if (helper.isTokenExpired(tk)) {

            usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

              var usuarioConvertido = Conversion.convertirAMototaxi(data);

              clienteService.getToken(usuarioConvertido).subscribe(data => {

                sessionStorage.setItem(environment.TOKEN_MOTOTAXI, data);
                tk = sessionStorage.getItem(environment.TOKEN_MOTOTAXI);

              })

            });
          }

        } else if (request.url.includes('18.230.178.121')) {
          tk = sessionStorage.getItem(environment.TOKEN_OCCIBANA);
        }

      }

      delay(1000);

      return tk != null ? tk : '';

    },
    allowedDomains: [
      'www.ubermotosisw.tk',
      '18.224.240.8',
      '18.230.178.121:8081',
      '52.67.179.68:8081',
    ],
    disallowedRoutes: [
      environment.UBER_MOTOS + '/usuario/login',
      environment.UBER_MOTOS + '/usuario/registro',
      environment.UBER_MOTOS + '/usuario/registro',
      environment.HCCAUCHOS + '/login/login',
      environment.HCCAUCHOS + '/Registro/Registro',
      environment.HCCAUCHOS + '/Usuario/catalogo',
      environment.UBER_MOTOS + '/cliente/logincliente',
      environment.UBER_MOTOS + '/cliente/registrocliente',
      environment.OCCIBANA + '/registroLogin/registroLogin',
      environment.OCCIBANA + '/registroLogin/postRegistroUsuario',
      environment.OCCIBANA + '/listas/postHotelesPrincipal',
      environment.OCCIBANA + '/listas/getHotelesDestacados',
      environment.SUPERFAST + '/Registrar/PostInsertar_Usuario',
      environment.SUPERFAST + '/comunicacion/GetmostrarProductoInicio',
      environment.SUPERFAST + '/admin/login',
    ]
  }
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    HistorialClienteComponent,
    Not404Component,
    Error500Component,
    RegistroComponent,
    HotelesComponent,
    RecuperarContrasenaComponent,
    GenerarTokenRecuperarComponent,
    CatalogoSuperFastComponent,
    HotelesComponent,
    ProductoDialogComponent,
    CatalogoHcCauchosComponent,
    ProductoDialogComponent,
    ProductoDialogComponent,
    PerfilUsuarioComponent,
    SolicitudServicioComponent,
    DetallesHotelComponent,
    HccauchosCarritoComponent
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatSnackBarModule,
    JwtModule.forRoot({

      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UsuarioTransversalService, AdminService, ClienteService]
      }
    }),
    NgbModule
  ],


  providers: [UsuarioTransversalService, AdminService, ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
