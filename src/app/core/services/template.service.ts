import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  pathImg= environment.pathImg;
//   assets/img/tupar_white.png
// assets/img/tupar_black.png

  constructor() { }

  getTemplate(client: any, products: any[], total: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const template_client: string = await this.getClient(client);
      let template_products = '';
      for (let i = 0; i < products.length; i++) {
        const item = products[i];
        template_products += await this.getProduct(item, total);
      }
      // console.log('template', client, products);

      fetch('/assets/template_body.txt')
        .then(response => response.text())
        .then(data => {
          // Do something with your data
          let text: string = data;
          const host = window.location.origin;
          text = text.replace("**nav_img**", `${host}/assets/img/tupar_white.png`);
          text = text.replace("**info_img**", `${host}/assets/img/tupar_black.png`);
          text = text.replace("**client**", template_client);
          text = text.replace("**products**", template_products);
          text = text.replace("**total**", this.formatter(total));
          resolve(text);
        });
    });
  }

  getClient(info: any): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch('/assets/template_client.txt')
        .then(response => response.text())
        .then(data => {
          // console.log('client',info)
          // Do something with your data
          let typeDoc;
            if(info.type_identification==1){
              typeDoc = 'CC'
            }else if(info.type_identification==2){
              typeDoc = 'TI'
            }else{
              typeDoc = 'N/A'
            }
          let text: string = data;
          text = text.replace("**first_name**", info.first_name);
          text = text.replace("**second_name**", info.second_name);
          text = text.replace("**first_surname**", info.first_surname);
          text = text.replace("**second_surname**", info.second_surname);
          text = text.replace("**email**", info.email);
          text = text.replace("**phone**", info.phone);
          text = text.replace("**type_identification**", typeDoc);
          text = text.replace("**document**", info.document);
          text = text.replace("**address**", info.address);
          resolve(text);
        });
    });
  }

  getProduct(info: any, total:any): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch('/assets/template_product.txt')
        .then(response => response.text())
        .then(data => {
          // console.log('Product',info)
          // Do something with your data
          const amount = (info.amount * info.price);
          let text: string = data;
          text = text.replace("**photo**", info.photo);
          text = text.replace("**name**", info.name);
          text = text.replace("**option**", info.option);
          text = text.replace("**amount**", info.amount);
          text = text.replace("**price**", this.formatter(amount));
          resolve(text);
        });
    });
  }

  private formatter(val: number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'COP',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(val);    
  }

}
