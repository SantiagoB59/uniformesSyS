import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { ProductService } from '../../core/services/product.service';
import {ConfirmationService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { environment } from 'src/environments/environment';
import { faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-comerce',
  templateUrl: './comerce.component.html',
  styleUrls: ['./comerce.component.scss']
})
export class ComerceComponent implements OnInit {
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  textSearch = '';
  
  products: Product[] = [];
  cities: City[] = [];
  selectedCity: City = <City>{};
  iniSession = false;
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sortKey: any = null;

  display: boolean = false;

  product: any = null ;

  category = 0;
  name = '';
  display2=false;
  load=true;
  tempProduct:any=null;

  responsiveOptions:any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private router: Router, 
    private procedure: ProceduresService,
    private activatedRouter: ActivatedRoute
  ) {
  //   this.responsiveOptions = [
  //     {
  //         breakpoint: '1024px',
  //         numVisible: 1,
  //         numScroll: 1
  //     },
  //     {
  //         breakpoint: '768px',
  //         numVisible: 1,
  //         numScroll: 1
  //     },
  //     {
  //         breakpoint: '560px',
  //         numVisible: 1,
  //         numScroll: 1
  //     }
  // ];
  this.procedure.login.subscribe(() => {
    this.iniSession = true;
  })
    this.activatedRouter.queryParams.subscribe((params:any)=>{
      if(params.textSearch!=null&&params.textSearch!=undefined){
        if(params.textSearch!=''){
          this.name = params.textSearch;
        }
      }
      if(params.category!=null&&params.category!=undefined){
        if(params.category!=''){
          this.category = params.category;
        }
      }
      const data = {
        name: this.name,
        category: this.category
      }
      this.procedure.currentData.emit(data);
      
    })
    this.procedure.search.subscribe((res) => {
      this.category = res.category;
      this.name = res.name;
      
    })

   }

  ngOnInit() {
    this.procedure.custom('products').subscribe((data: any[]) => {
      console.log(data);
      
      this.products = data.map((item: any) => {
        item.inventoryStatus = item.state;
        item.priceWithout = item.price;
        item.priceDisc = item.price;
        if (item.discount) {
          item.priceDisc = item.price - (item.price * item.discount);
        } else {
          item.discount = 0;
        }
        if (item.options!='') {
          item.options = item.options.split(',').map((item1: any) => {
            return {name: item1, code: item1, inactive: false};
          }); 
          // console.log(item.options)
        } else {
          item.options = [];
        }
        item.option = '';
        if (item.photos ==null) {
          item.photos = [];
        }
        const photos = item.photos.map((photo: any) => {
          return environment.host+'/'+photo.location;
        })
        item.photos = [environment.host+'/'+item.photo].concat(photos);
        return item;
      });
      
      setTimeout(() => {
        this.load = false;
      }, 500);
      
    })
    this.sortOptions = [
      { label: 'Precio (Mayor a Menor)', value: '!price' },
      { label: 'Precio (Menor a Mayor)', value: 'price' }
    ];
    this.primengConfig.ripple = true;
  }

  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  validSession(data: any) {
    const session = sessionStorage.getItem('client_id');
    if (session) {
      this.addCar(data);
    } else {
      this.addCarLocal(data);
    }
  }

  filter(ev: any) {
    return ev.target.value;
  }

  addCarLocal(data: any) {
    this.display2=true;
    setTimeout(() => {
      const local = localStorage.getItem('car');
      data.option = data.option ==''?'N/A': data.option.code;
      data.amount = 1;
      if(local) {
        const vec: any[] = JSON.parse(local);
        const e = vec.findIndex((item) => {
          return item.id == data.id && item.option == data.option;
        })
        if (e == -1) {
          vec.push(data);
        } else {
          vec[e].amount += 1;
        }
        localStorage.setItem('car', JSON.stringify(vec));
      } else {
        localStorage.setItem('car', JSON.stringify([data]));
      }
      this.display2=false;
      this.openDialog();
    }, 500);
  }

  addCar(data1: any) {
    this.display2 = true;
    this.procedure.list('service', ['id'], {type_service: 1, client: sessionStorage.getItem('client_id')}).subscribe((data: any[]) => {
      this.display2 = false;
      if (data == null) {
        const info = {
          begin_date: this.getDate(),
          type_service: 1,
          client: sessionStorage.getItem('client_id')
        }
        this.procedure.create('service', info).subscribe(() => {
          this.addCar(data1);
        });

      } else  {
        const option = data1.option ==''?'N/A': data1.option.code;
        this.procedure.list('order_buy',['id', 'amount'], {product: data1.id, opt: option, service: data[0].id}).subscribe((res1: any[]) => {
          if(res1 == null) {
            const info = {
              amount: 1,
              opt: option,
              service: data[0].id,
              product: data1.id
            }
            this.procedure.create('order_buy', info).subscribe(() => {
              this.openDialog();
            });

          } else {
            const info = {
              amount: res1[0].amount+1
            };
            this.procedure.update('order_buy', info, res1[0].id).subscribe(() => {
              this.openDialog();
              // alert('actualizado con exito')
            })
          }
        })
      }
      
    })
    
  }

  getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }


    showDialog(data: any) {
      this.product = data;
        this.display = true;
    }

    openDialog() {
      // console.log('Que es lo que pasa');
      this.confirmationService.confirm({
        message: 'Se ha agregado el producto a tu carrito',
        accept: () => {
            this.router.navigate(['/cart'])
        }
    });
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
