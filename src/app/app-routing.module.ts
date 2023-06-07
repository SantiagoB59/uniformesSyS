import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { NoLoginGuard } from './core/guards/no-login.guard';
import { ComerceComponent } from './private/comerce/comerce.component';
import { PrivateComponent } from './private/private.component';
import { CalidadGarantiaComponent } from './public/calidad-garantia/calidad-garantia.component';
import { CambiosComponent } from './public/cambios/cambios.component';
import { FormasPagoComponent } from './public/formas-pago/formas-pago.component';
import { HomeComponent } from './public/home/home.component';
import { InformacionGeneralComponent } from './public/informacion-general/informacion-general.component';
import { NuestrosHorariosComponent } from './public/nuestros-horarios/nuestros-horarios.component';
import { PublicComponent } from './public/public.component';
import { SearchComponent } from './public/search/search.component';
import { SobreNosotrosComponent } from './public/sobre-nosotros/sobre-nosotros.component';
import { TiemposDeEntregaComponent } from './public/tiempos-de-entrega/tiempos-de-entrega.component';




const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'comerce',
    component: ComerceComponent
  },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'',
    component: PrivateComponent,
    loadChildren: () => import('./private/private-routing.module').then(m=>m.PrivateRoutingModule),
    canActivate: [LoginGuard] 
  },
  {
    path: '',
    component: PublicComponent,
    loadChildren: () => import('./public/public-routing.module').then(m=>m.PublicRoutingModule),
    canActivate: [NoLoginGuard]
  },
  { path:'sobre-nosotros', component: SobreNosotrosComponent},
  { path:'nuestros-horarios', component: NuestrosHorariosComponent},
  { path:'informacion-general', component: InformacionGeneralComponent},
  { path:'tiempos-de-entrega', component: TiemposDeEntregaComponent},
  { path:'formas-pago', component: FormasPagoComponent},
  { path:'cambios', component: CambiosComponent},
  { path:'calidad-garantia', component: CalidadGarantiaComponent},
  { path:'search', component: SearchComponent},
  {
    path: '**',
    redirectTo: 'home'
  } 
/* {path:'', redirectTo:'home',pathMatch:'full'},
{path:'home', component:HomeComponent},

{path: '**', redirectTo: 'home'}
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Add options right here
    })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
