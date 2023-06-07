import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calidad-garantia',
  templateUrl: './calidad-garantia.component.html',
  styleUrls: ['./calidad-garantia.component.scss']
})
export class CalidadGarantiaComponent implements OnInit {
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  display = false;
  textSearch = '';


  iniSession = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeSession(){
    sessionStorage.clear();
    window.location.reload();
  }

}
