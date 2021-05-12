<<<<<<< HEAD
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
=======
>>>>>>> acd6e8960347b3c9d529831ac9b30c2bd2806204
import { GenerarTokenRecuperarComponent } from './components/generar-token-recuperar/generar-token-recuperar.component';
import { CatalogoSuperFastComponent } from './components/catalogo-super-fast/catalogo-super-fast.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';


const routes: Routes = [
<<<<<<< HEAD
  //{path: '', component: CatalogoSuperFastComponent},   
  {path: '', component: RegistroComponent},   
=======
  {path: '', component: CatalogoSuperFastComponent},
>>>>>>> acd6e8960347b3c9d529831ac9b30c2bd2806204
  {path: 'login', component: LoginComponent},
  {path: 'generarTokenRecuperar', component: GenerarTokenRecuperarComponent},
  {path:'recuperarContrasena', component:RecuperarContrasenaComponent},
  {path: 'historialCliente', component: HistorialClienteComponent},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: 'hoteles', component: HotelesComponent},
  {path: '**', component: Not404Component}

<<<<<<< HEAD
  
=======
>>>>>>> acd6e8960347b3c9d529831ac9b30c2bd2806204
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
