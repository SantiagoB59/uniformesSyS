import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { TemplateService } from 'src/app/core/services/template.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  faDelete = faXmark;

  products: any[] = [];
  email_proucts: any[] = [];

  count = 0;

  service: number = 0;
  total = 0;
  empty = true;
  display2 = false;

  constructor(
    private procedure: ProceduresService,
    private template: TemplateService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validSession();
  }

  validSession() {
    const session = sessionStorage.getItem('client_id');
    if (session) {
      this.getCart();
    } else {
      this.getCartLocal();
    }
  }

  getCartLocal() {
    // console.log('entra lcoal')
    const local = localStorage.getItem('car');
    this.total = 0;
    this.count = 0;
    if (local) {
      const r = JSON.parse(local);
      this.products = r.map((res: any) => {
        res.priceWithout = res.price;
        res.priceDisc = res.price;
        if (res.discount) {
          res.priceDisc = res.price - (res.price * res.discount);
        } else {
          res.discount = 0;
        }
        this.count += res.amount;
        this.total += (res.amount * res.priceDisc);
        res.photo = res.photo.includes('http') ? res.photo : environment.host + '/' + res.photo;
        return res;
      });
      // console.log(this.products)
      // if(this.products.length==0)
      this.empty = false;
    } else {
      this.products = [];
      // if(this.products.length==0)
      this.empty = false;
    }
  }

  getCart() {
    this.procedure.list('service', ['id'], { type_service: 1, client: sessionStorage.getItem('client_id') }).subscribe((data: any[]) => {
      // console.log(data)
      if (data == null) {
        const info = {
          begin_date: this.getDate(),
          type_service: 1,
          client: sessionStorage.getItem('client_id')
        }
        this.procedure.create('service', info).subscribe(() => {
          this.getCart();
        });

      } else {
        // console.log(data[0].id);
        this.procedure.custom('services', { client: sessionStorage.getItem('client_id'), type_service: 1 }).subscribe((res1: any[]) => {
          this.service = res1[0].id;
          this.total = 0;
          this.count = 0;
          this.products = res1[0].product ? res1[0].product.map((product: any) => {
            product.priceWithout = product.price;
            product.priceDisc = product.price;
            if (product.discount) {
              product.priceDisc = product.price - (product.price * product.discount);
            } else {
              product.discount = 0;
            }
            this.count += product.amount;
            this.total += (product.amount * product.priceDisc);
            product.photo = environment.host + '/' + product.photo;
            return product;
          }) : [];
          this.empty = false;
        })
      }

    })
  }

  remove(key: number, local = 0) {
    // console.log(key)
    if (local == 0) {
      this.procedure.remove('order_buy', key).subscribe(() => {
        this.getCart();
      })
    } else {
      this.products = this.products.filter((value, key1) => {
        return key != key1;
      })
      localStorage.setItem('car', JSON.stringify(this.products))
      this.countProduct()
    }
  }

  getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  buy() {
    this.display2 = true;
    const client = sessionStorage.getItem('data');
    if (client) {
      setTimeout(() => {
        this.display2 = false;
        this.openConfirm();
      }, 500);
    } else {
      //window.location.reload();
      setTimeout(() => {
        this.display2 = false;
        this.openDialog();
      }, 500);
    }
  }

  endBuy() {
    this.display2 = true;
    const client = sessionStorage.getItem('data');
    const data = {
      type_service: 2,
      end_date: this.getDate(),
      mount: this.total
    }
    this.procedure.update('service', data, this.service).subscribe(() => {

      this.template.getTemplate(JSON.parse(client!), this.products, this.total).then((text: string) => {
        document.getElementById("email1")!.setAttribute("value", environment.email);
        document.getElementById("message1")!.innerHTML = text;
        const d: any = document.getElementById('gform');
        d?.submit();
        this.getCart();
        setTimeout(() => {
          this.display2 = false;
        }, 500);
        this.openEnd();
      })

    })
  }

  updateOrder(id: number, amount: number, pos: number) {
    if (amount == 0) {
      const session = sessionStorage.getItem('client_id');
      if (session) {
        this.remove(id);
      } else {
        this.remove(pos, 1);
      }
      this.getCart();
    } else {
      const session = sessionStorage.getItem('client_id');
      if (session) {
        const data = {
          amount
        }
        this.procedure.update('order_buy', data, id).subscribe(() => {
          this.getCart();
          // this.openEnd();
          // alert('Se ha enviado su solicitud');

        })
      } else {
        this.products[pos].amount = amount;
        localStorage.setItem('car', JSON.stringify(this.products));
        this.countProduct();
      }
    }
  }

  deleteProduct(id: number, amount: number, pos: number) {
    const session = sessionStorage.getItem('client_id');
    if (session) {
      this.remove(id);
    } else {
      this.remove(pos, 1);
    }
  }

  openDialog() {
    this.confirmationService.confirm({
      message: 'Debes iniciar sesion',
      accept: () => {
        this.router.navigate(['/login-register'])
      },
      key: 'login'
    });
  }

  openConfirm() {
    this.confirmationService.confirm({
      message: '¿Deseas finalizar tu compra?',
      accept: () => {
        this.endBuy();
      },
      key: 'buy'
    });
  }

  openEnd() {
    this.confirmationService.confirm({
      message: '¡Compra finalizada, Se ha notificado, pronto nos comunicaremos contigo!',
      accept: () => {
        // this.endBuy();
      },
      key: 'end'
    });
  }
  countProduct() {
    this.total = 0;
    this.count = 0;
    this.products.forEach((res) => {
      this.total += res.amount * res.price;
      this.count += res.amount;
    })
  }

  back() {
    this.router.navigate(['/comerce'])
  }



}
