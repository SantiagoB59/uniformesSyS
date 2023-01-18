import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProceduresService } from 'src/app/core/services/procedures.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  textSearch = '';
  faOff = faPowerOff;
  faClose = faXmark;
  cities: City[] = [];

  selectedCity: City = <City>{};
  constructor(    private router: Router,
    private procedure: ProceduresService) {
    }

  ngOnInit(): void {
  }
  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
  }
}

interface City {
  name: string,
  code: number
}

