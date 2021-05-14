import { environment } from 'src/environments/environment';
import { MasterComponent } from './components/master/master.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { HotelesPipe } from './pipes/hoteles.pipe';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { CatalogoHcCauchosComponent } from './components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';
import { JwtModule } from '@auth0/angular-jwt';

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
    HotelesPipe,
    ProductoDialogComponent,
    

    CatalogoHcCauchosComponent,
    HotelesPipe,
    ProductoDialogComponent,
    HotelesPipe,
    ProductoDialogComponent,
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
      config: {
        tokenGetter: (request) => {
          console.log('hola');
          console.log(environment.UBER_MOTOS);
          
          let tk: string;
          console.log('kajk');

          if (request.url.includes('www.ubermotosisw.tk/api/usuario')) {
            tk = sessionStorage.getItem(environment.TOKEN);
          } else if (request.url.includes('52.67.179.68')) {
            tk = sessionStorage.getItem(environment.TOKEN_SUPERFAST);
          } else if (request.url.includes('18.224.240.8')) {
            tk = sessionStorage.getItem(environment.TOKEN_HCCAUCHOS);
          } else if (request.url.includes('ubermotosisw')) {
            tk = sessionStorage.getItem(environment.TOKEN_MOTOTAXI);
          } else if (request.url.includes('18.230.178.121')) {
            tk = sessionStorage.getItem(environment.TOKEN_OCCIBANA);
          }
          console.log(tk);
          console.log(request);

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
        ],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
