import { CatalogoSuperFastComponent } from './components/catalogo-super-fast/catalogo-super-fast.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';


const routes: Routes = [
  {path: '', component: CatalogoSuperFastComponent},   
  {path: 'login', component: LoginComponent},
  {path: 'historialCliente', component: HistorialClienteComponent},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: 'hoteles', component: HotelesComponent},
  {path: '**', component: Not404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
