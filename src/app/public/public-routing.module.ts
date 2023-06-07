import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalidadGarantiaComponent } from './calidad-garantia/calidad-garantia.component';
import { CambiosComponent } from './cambios/cambios.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { HomeComponent } from './home/home.component';
import { InformacionGeneralComponent } from './informacion-general/informacion-general.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NuestrosHorariosComponent } from './nuestros-horarios/nuestros-horarios.component';
import { SearchComponent } from './search/search.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { TiemposDeEntregaComponent } from './tiempos-de-entrega/tiempos-de-entrega.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  /* {
    path: 'home',
    component: HomeComponent
  }, */
   {
    path: 'login',
    component: LoginRegisterComponent
  }, 
  /* { path: 'home'    , component: HomeComponent }, */
   { path: 'registro', component: RegistroComponent },
  { path: 'login2'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
  

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
