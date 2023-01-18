import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  dateNow='';

  constructor() { 
    this.dateNow = new Date().getUTCFullYear().toString();
  }

  ngOnInit(): void {

  }

}
