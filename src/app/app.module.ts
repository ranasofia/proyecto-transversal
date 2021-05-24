import { environment } from 'src/environments/environment';
import { MasterComponent } from 'src/app/components/transversal_components/master/master.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/transversal_components/login/login.component';
import { HistorialClienteComponent } from 'src/app/components/mototaxi_components/historial-cliente/historial-cliente.component';
import { Not404Component } from 'src/app/pages/not404/not404.component';
import { Error500Component } from 'src/app/pages/error500/error500.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from 'src/app/components/transversal_components/registro/registro.component';
import { CatalogoSuperFastComponent } from 'src/app/components/superfast_components/catalogo-super-fast/catalogo-super-fast.component';
import { HotelesComponent } from 'src/app/components/occibana_components/hoteles/hoteles.component';
import { RecuperarContrasenaComponent } from 'src/app/components/transversal_components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from 'src/app/components/transversal_components/generar-token-recuperar/generar-token-recuperar.component';
import { ProductoDialogComponent } from 'src/app/components/hcYsuperfast_components/producto-dialog/producto-dialog.component';
import { CatalogoHcCauchosComponent } from 'src/app/components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { AdminService } from 'src/app/_service/superfast_service/admin.service';
import { Conversion } from 'src/app/_model/utilidades/Conversion';
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { PerfilUsuarioComponent } from 'src/app/components/transversal_components/perfil-usuario/perfil-usuario.component';
import { SolicitudServicioComponent } from 'src/app/components/mototaxi_components/solicitud-servicio/solicitud-servicio.component';
import { DetallesHotelComponent } from 'src/app/components/occibana_components/detalles-hotel/detalles-hotel.component';
import { HccauchosCarritoComponent } from 'src/app/components/hccauchos_components/hccauchos-carrito/hccauchos-carrito.component';
import { SuperfastCarritoComponent } from 'src/app/components/superfast_components/superfast-carrito/superfast-carrito.component';
import { UsuariosComponent } from 'src/app/components/transversal_components/usuarios/usuarios.component';
import { FormularioUsuariosComponent } from 'src/app/components/transversal_components/usuarios/formulario-usuarios/formulario-usuarios.component';
import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { RegistroLoginOccibanaService } from 'src/app/_service/occibana_service/registro-login-occibana.service';
import { DatePipe } from '@angular/common';
import { DialogEliminarComponent } from 'src/app/components/transversal_components/usuarios/dialog-eliminar/dialog-eliminar.component';

export function jwtOptionsFactory(usuarioTransversalService: UsuarioTransversalService,
  adminService: AdminService,
  clienteService: ClienteService,
  loginHCService: LoginHCService,
  registroLoginOccibanaService: RegistroLoginOccibanaService) {
  return {
    tokenGetter: async (request) => {

      let tk: string;

      const helper = new JwtHelperService();

      let usuarioIncompleto = new Usuario();
      usuarioIncompleto.correo = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).email;
      usuarioIncompleto.usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).name;

      if (request.url.includes('www.ubermotosisw.tk/api/usuario')) {

        tk = sessionStorage.getItem(environment.TOKEN);

        if (helper.isTokenExpired(tk)) {

          var usuarioLogin = new Usuario();
          usuarioLogin.correo = usuarioIncompleto.correo;
          usuarioLogin.contrasena = sessionStorage.getItem("clave");
          usuarioTransversalService.getToken(usuarioLogin).subscribe(data => {

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

        if (helper.isTokenExpired(tk)) {

          usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

            var usuarioConvertido = Conversion.convertirAHCCauchos(data);

              loginHCService.getToken(usuarioConvertido).subscribe(data => {

              sessionStorage.setItem(environment.TOKEN_HCCAUCHOS, data);
              tk = sessionStorage.getItem(environment.TOKEN_HCCAUCHOS);

            })

          });
        }

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

        if (helper.isTokenExpired(tk)) {

          usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

            var usuarioConvertido = Conversion.convertirAOccibana(data);

              registroLoginOccibanaService.getToken(usuarioConvertido).subscribe(data => {

              sessionStorage.setItem(environment.TOKEN_OCCIBANA, data);
              tk = sessionStorage.getItem(environment.TOKEN_OCCIBANA);

            })

          });
        }
      }


      for (var i = 0; i < 10; i++) {

        if(tk != undefined){

          break;

        }

        await delay(300);

      }
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
      environment.UBER_MOTOS + '/usuario/generarContraseña',
      environment.UBER_MOTOS + '/usuario/RecuperarContraseña',
      environment.HCCAUCHOS + '/login/login',
      environment.HCCAUCHOS + '/Registro/Registro',
      environment.HCCAUCHOS + '/Usuario/catalogo',
      environment.HCCAUCHOS + '/login/cerrarcesion',
      environment.UBER_MOTOS + '/cliente/logincliente',
      environment.UBER_MOTOS + '/cliente/registrocliente',
      environment.OCCIBANA + '/registroLogin/registroLogin',
      environment.OCCIBANA + '/registroLogin/postRegistroUsuario',
      environment.OCCIBANA + '/listas/postHotelesPrincipal',
      environment.OCCIBANA + '/listas/getHotelesDestacados',
      environment.SUPERFAST + '/Registrar/PostInsertar_Usuario',
      environment.SUPERFAST + '/comunicacion/GetmostrarProductoInicio',
      environment.SUPERFAST + '/admin/login',
      environment.SUPERFAST + '/CerrarSession/PostPage_Load'
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
    HccauchosCarritoComponent,
    SuperfastCarritoComponent,
    UsuariosComponent,
    FormularioUsuariosComponent,
    DialogEliminarComponent
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
        deps: [UsuarioTransversalService, AdminService, ClienteService, LoginHCService, RegistroLoginOccibanaService]
      }
    }),
    NgbModule
  ],


  providers: [UsuarioTransversalService, AdminService, ClienteService, LoginHCService, RegistroLoginOccibanaService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
