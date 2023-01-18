import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { ModulesModule } from '../modules/modules.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModulesModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ],
  providers: [
  ]
})
export class ComponentsModule { }
