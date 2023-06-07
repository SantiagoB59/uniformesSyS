import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { ModulesModule } from '../modules/modules.module';
import { WppButtonComponent } from './wpp-button/wpp-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WppButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModulesModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    WppButtonComponent
  ],
  providers: [
  ]
})
export class ComponentsModule { }
