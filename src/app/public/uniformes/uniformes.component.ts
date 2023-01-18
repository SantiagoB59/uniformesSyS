import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.scss']
})
export class UniformesComponent implements OnInit {
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  iniSession = false;
  textSearch = '';

  cities: City[] = [];

  selectedCity: City = <City>{};
  constructor() { }

  ngOnInit(): void {
  }
  closeSession(){
    sessionStorage.clear();
    window.location.reload();
  }
}
interface City {
  name: string,
  code: number
}
