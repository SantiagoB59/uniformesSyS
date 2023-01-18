import { Component, OnInit } from '@angular/core';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduresService } from '../../services/procedures.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  display = false;
  items: MenuItem[] = [];
  textSearch = '';

  cities: City[] = [];

  selectedCity: City = <City>{};
  iniSession = false;


  constructor(
    private router: Router,
    private procedure: ProceduresService
  ) {
    this.procedure.currentData.subscribe(data => {
      this.textSearch = data.name;
      this.selectedCity.code = data.category;
    })

    this.procedure.login.subscribe(() => {
      this.iniSession = true;
    })
  }

  ngOnInit(): void {

    this.existUser();

    this.getCategory();
      this.items = [
          {
              label: 'File',
              items: [{
                      label: 'New', 

                      items: [
                          {label: 'Project'},
                          {label: 'Other'},
                      ]
                  },
                  {label: 'Open'},
                  {label: 'Quit'}
              ]
          },
          {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                  {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
              ]
          }
      ];
  }

  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
  }

  getCategory() {
    this.cities = [{name: 'Todos', code: 0}];/* 
    this.procedure.list('category',['id', 'name']).subscribe((res: any[]) => {
      const vec = res.map((item) => {
        const data =  {name: item.name, code: item.id};
        return data;
      })
      this.cities.push(...vec);
    }) */
  }


  existUser(){
    if(sessionStorage.getItem('data')){
      this.iniSession= true;
    }
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