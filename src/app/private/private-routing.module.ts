import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalidadGarantiaComponent } from '../public/calidad-garantia/calidad-garantia.component';
import { CambiosComponent } from '../public/cambios/cambios.component';
import { FormasPagoComponent } from '../public/formas-pago/formas-pago.component';
import { InformacionGeneralComponent } from '../public/informacion-general/informacion-general.component';
import { NuestrosHorariosComponent } from '../public/nuestros-horarios/nuestros-horarios.component';
import { SobreNosotrosComponent } from '../public/sobre-nosotros/sobre-nosotros.component';
import { TiemposDeEntregaComponent } from '../public/tiempos-de-entrega/tiempos-de-entrega.component';
import { CartComponent } from './cart/cart.component';
import { ComerceComponent } from './comerce/comerce.component';


const routes: Routes = [ 
/*   {
  path: 'comerce',
  component: ComerceComponent
}, */
  {
    path: 'cart',
    component: CartComponent
  },
/*   { path:'sobre-nosotros', component: SobreNosotrosComponent},
  { path:'nuestros-horarios', component: NuestrosHorariosComponent},
  { path:'informacion-general', component: InformacionGeneralComponent},
  { path:'tiempos-de-entrega', component: TiemposDeEntregaComponent},
  { path:'formas-pago', component: FormasPagoComponent},
  { path:'cambios', component: CambiosComponent},
  { path:'calidad-garantia', component: CalidadGarantiaComponent} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
