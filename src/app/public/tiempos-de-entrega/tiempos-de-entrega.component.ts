import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tiempos-de-entrega',
  templateUrl: './tiempos-de-entrega.component.html',
  styleUrls: ['./tiempos-de-entrega.component.scss']
})
export class TiemposDeEntregaComponent implements OnInit {
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


