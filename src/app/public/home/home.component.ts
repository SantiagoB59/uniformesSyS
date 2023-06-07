import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem, ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/core/interfaces/product';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { faArrowRightLong, faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import {CarouselModule} from 'primeng/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  iniSession = false;
  contador =0;
  products: any[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sortKey: any = null;
  estrella = "";
  category = 0;
  name = '';
  display = false;
  product: any = null;
  display2=false;
  faNext = faArrowRightLong;
  banner: any[] = [];
  textSearch = '';
  load=true;
  cities: City[] = [];

  selectedCity: City = <City>{};

  constructor(
    private primengConfig: PrimeNGConfig, 
    private procedure: ProceduresService, 
    private confirmationService: ConfirmationService,
    private router: Router
    ) {
    this.procedure.search.subscribe((res) => {
      this.category = res.category;
      this.name = res.name;
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.load = false;
    }, 500);
    this.getBanner()
    this.procedure.custom('randomProduct', {num: 6}).subscribe((data: any[]) => {
      // console.log(data);
      
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
      
    })

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

    this.primengConfig.ripple = true;
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

  filter(ev: any) {
    return ev.target.value;
  }

  validSession(data: any) {
    const session = sessionStorage.getItem('client_id');
    if (session) {
      this.addCar(data);
    } else {
      this.addCarLocal(data);
      //alert('Debes iniciar sesión para iniciar una compra');
    }
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
        // console.log(e)
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
          this.display2 = false;
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

  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
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
    this.confirmationService.confirm({
      message: 'Se ha agregado el producto a tu carrito',
      accept: () => {
          this.router.navigate(['/cart'])
      }
  });
  }

  getBanner() {
    this.procedure.list('banner', ['photo']).subscribe((res: any) => {
      if(res == null) {
        this.banner=[];
      } else {
        this.banner = res.map((item: any) => {
          item.photo = environment.host+'/'+item.photo;
          return item;
        });
      }
    })
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