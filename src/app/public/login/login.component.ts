import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAngleLeft, faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { ProceduresService } from 'src/app/core/services/procedures.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuarioLogin: FormGroup;

  faUser = faUser;
  faCart = faCartShopping;
  faBars = faBars;
  faClose = faXmark;
  faOff = faPowerOff;
  faLeft = faAngleLeft;
  iniSession = false;
  textSearch = '';

  cities: City[] = [];

  selectedCity: City = <City>{};
  view=1;
  email = '';
  password = '';

  types: any[] = [
    {
      name: 'Seleccionar', code:''
    }
  ];
  selectedTypes: any = null;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private procedure: ProceduresService,
    ){

    this.usuarioLogin = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: new FormControl('', Validators.required), 
    })
  }
  ngOnInit(){
    
    
  }

  login(){
    console.log("imprimir si es valido")
  }

  onSubmit(){

    console.log(this.usuarioLogin.value);
  }

  capturarDatos() {
    console.log(this.usuarioLogin.value);
 
    var formData = new FormData();
    console.log(this.usuarioLogin)
    Object.entries(this.usuarioLogin.value).forEach(([key, value]:any) => {
      console.log(key, value)
      formData.append(key, value);
    });

    this.reset();

  }

  reset(){
    this.usuarioLogin.reset();
  }
  get f(){
    return this.usuarioLogin.controls;
  }

  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
  }
  verify(){
    console.log(this.usuarioLogin.value)
    this.getFormValidationErrors1();
    if(this.usuarioLogin.valid){
      setTimeout(() => {
        this.procedure.list('client', ['email'], {email: this.usuarioLogin.value.email}).subscribe((res: any[]) => {
        })
        this.procedure.list('client', ['password'], {password: this.usuarioLogin.value.password}).subscribe((res: any[]) => {
        })
      }, 500);
    }else{
      setTimeout(() => {
      }, 500);
      this.getFormValidationErrors1();
    }
  }



  getFormValidationErrors1() {
    Object.keys(this.usuarioLogin.controls).forEach(key => {
      this.usuarioLogin.controls[key].markAsTouched();
      const controlErrors: any = this.usuarioLogin.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  
  addCar(data1: any) {
    this.procedure.list('service', ['id'], {type_service: 1, client: sessionStorage.getItem('client_id')}).subscribe((data: any[]) => {
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
        const option = data1.option ==''?'N/A': data1.option;
        this.procedure.list('order_buy',['id', 'amount'], {product: data1.id, opt: option, service: data[0].id}).subscribe((res1: any[]) => {
          if(res1 == null) {
            const info = {
              amount: data1.amount,
              opt: option,
              service: data[0].id,
              product: data1.id
            }
            this.procedure.create('order_buy', info).subscribe(() => {
              
            });

          } else {
            const info = {
              amount: res1[0].amount+data1.amount
            };
            this.procedure.update('order_buy', info, res1[0].id).subscribe(() => {
              //alert('actualizado con exito')
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

  setCarLocal() {
    const local = localStorage.getItem('car');
    if (local) {
      const vec = JSON.parse(local);
      vec.forEach((element:any) => {
        this.addCar(element);
      });
      localStorage.setItem('car', JSON.stringify([]));
      // alert('verifica los producos en tu carro de compras')
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



