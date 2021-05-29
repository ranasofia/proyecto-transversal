import { ConversarComponent } from './components/mototaxi_components/conversar/conversar.component';
import { ComentarComponent } from './components/mototaxi_components/comentar/comentar.component';
import { ReservaHabitacionComponent } from './components/occibana_components/reserva-habitacion/reserva-habitacion.component';
import { FacturaComponent } from './components/mototaxi_components/factura/factura.component';
import { SuperfastCarritoComponent } from './components/superfast_components/superfast-carrito/superfast-carrito.component';
import { HccauchosCarritoComponent } from './components/hccauchos_components/hccauchos-carrito/hccauchos-carrito.component';
import { FormularioUsuariosComponent } from './components/transversal_components/usuarios/formulario-usuarios/formulario-usuarios.component';
import { UsuariosComponent } from './components/transversal_components/usuarios/usuarios.component';
import { DetallesHotelComponent } from './components/occibana_components/detalles-hotel/detalles-hotel.component';
import { PerfilUsuarioComponent } from './components/transversal_components/perfil-usuario/perfil-usuario.component';
import { SolicitudServicioComponent } from './components/mototaxi_components/solicitud-servicio/solicitud-servicio.component';
import { CatalogoHcCauchosComponent } from './components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';
import { RecuperarContrasenaComponent } from './components/transversal_components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from './components/transversal_components/generar-token-recuperar/generar-token-recuperar.component';
import { CatalogoSuperFastComponent } from './components/superfast_components/catalogo-super-fast/catalogo-super-fast.component';
import { RegistroComponent } from './components/transversal_components/registro/registro.component';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './components/transversal_components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/mototaxi_components/historial-cliente/historial-cliente.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';
import { GuardianService } from 'src/app/_service/utilidades/guardian.service';
import { registerLocaleData } from '@angular/common';


const routes: Routes = [

  {path: '', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'generarTokenRecuperar', component: GenerarTokenRecuperarComponent},
  {path: 'recuperarContrasena', component:RecuperarContrasenaComponent},
  {path: 'superfast/catalogo', component: CatalogoSuperFastComponent, canActivate:[GuardianService]},
  {path: 'superfast/carrito', component: SuperfastCarritoComponent, canActivate:[GuardianService]},
  {path: 'hccauchos/catalogo', component: CatalogoHcCauchosComponent, canActivate:[GuardianService]},
  {path: 'hccauchos/carrito', component: HccauchosCarritoComponent, canActivate:[GuardianService]},
  {path: 'mototaxi/solicitudServicio', component: SolicitudServicioComponent, children: [
    {path: 'factura', component: FacturaComponent}], canActivate:[GuardianService]},
  {path: 'mototaxi/historialCliente', component: HistorialClienteComponent, children: [
    {path:'comentar/:id',component:ComentarComponent}, 
    {path:'conversar/:id',component:ConversarComponent}], canActivate:[GuardianService]},
  {path: 'occibana/hoteles', component: HotelesComponent, children: [
    {path: 'detallesHotel/:id', component: DetallesHotelComponent},
    {path: 'resevarHabitacion/:id', component: ReservaHabitacionComponent}
  ], canActivate:[GuardianService]},
  {path: 'usuarios', component: UsuariosComponent, children: [
    {path: 'registrar', component: FormularioUsuariosComponent},
    {path: 'modificar/:id', component: FormularioUsuariosComponent}
  ]},
  {path: 'perfil', component: PerfilUsuarioComponent, canActivate:[GuardianService]},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: '**', component: Not404Component}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
