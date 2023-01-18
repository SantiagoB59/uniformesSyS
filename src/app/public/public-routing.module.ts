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
import { TiendaComponent } from './tienda/tienda.component';
import { UniformesComponent } from './uniformes/uniformes.component';

const routes: Routes = [
  /* {
    path: 'home',
    component: HomeComponent
  }, */
  {
    path: 'login-register',
    component: LoginRegisterComponent
  },
  { path:'uniformes', component: UniformesComponent},
  { path:'tienda', component: TiendaComponent},
 

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
