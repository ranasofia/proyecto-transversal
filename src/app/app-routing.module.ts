import { SolicitudServicioComponent } from './components/mototaxi_components/solicitud-servicio/solicitud-servicio.component';
import { CatalogoHcCauchosComponent } from './components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from './components/generar-token-recuperar/generar-token-recuperar.component';
import { CatalogoSuperFastComponent } from './components/superfast_components/catalogo-super-fast/catalogo-super-fast.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/mototaxi_components/historial-cliente/historial-cliente.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';
import { GuardianService } from './_service/guardian.service';


const routes: Routes = [

  {path: '', component: RegistroComponent},   
  {path: 'login', component: LoginComponent},
  {path: 'generarTokenRecuperar', component: GenerarTokenRecuperarComponent},
  {path: 'recuperarContrasena', component:RecuperarContrasenaComponent},
  {path: 'superfast/catalogo', component: CatalogoSuperFastComponent, canActivate:[GuardianService]},
  {path: 'hccauchos/catalogo', component: CatalogoHcCauchosComponent, canActivate:[GuardianService]},
  {path: 'mototaxi/solicitudServicio', component: SolicitudServicioComponent, canActivate:[GuardianService]},
  {path: 'mototaxi/historialCliente', component: HistorialClienteComponent, canActivate:[GuardianService]},
  {path: 'occibana/hoteles', component: HotelesComponent, canActivate:[GuardianService]},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: '**', component: Not404Component}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
