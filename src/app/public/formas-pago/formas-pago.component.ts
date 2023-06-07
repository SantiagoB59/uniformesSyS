import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.scss']
})
export class FormasPagoComponent implements OnInit {
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  iniSession = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeSession(){
    sessionStorage.clear();
    window.location.reload();
  }
}
