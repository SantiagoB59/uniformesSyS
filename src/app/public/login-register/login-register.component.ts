import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAngleLeft, faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { MustMatch } from '../../core/helper/MustMatch';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
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

  data = {
    first_name: '',
    second_name: '',
    first_surname: '',
    second_surname	: '',
    email: '',
    gender: '',
    birth_date: null,
    phone: '',
    password: '',
    type_identification: 1,
    document: '',
    address: ''
  }

  types: any[] = [
    {
      name: 'Seleccionar', code:''
    }
  ];
  selectedTypes: any = null;
  display2: boolean = false;

  public viewForm1: FormGroup;
  public viewForm2: FormGroup;
  public viewForm3: FormGroup;

  constructor(
    private router: Router,
    private procedure: ProceduresService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.viewForm1 = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
    this.viewForm2 = new FormGroup({
      password: new FormControl('', Validators.required)
    });

    this.viewForm3 = formBuilder.group ({
      first_name: new FormControl('', Validators.required),
      second_name: new FormControl('', ),
      first_surname: new FormControl('', Validators.required),
      second_surname: new FormControl('', ),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      confirm_email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      gender: new FormControl(null),
      birth_date: new FormControl('', ),
      phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9+]*$")]),
      password: new FormControl('',  Validators.required),
      confirm_password: new FormControl('',  Validators.required),
      temp_password: new FormControl('',  Validators.required),
      type_identification: new FormControl(null,  Validators.required),
      temp_type_identification: new FormControl(''),
      document: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    },{
      validators: [MustMatch('temp_password', 'confirm_password'), MustMatch('email','confirm_email')]
    });
  }

  ngOnInit(): void {
    this.getType();
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
    this.display2 = true;
    this.getFormValidationErrors1();
    if(this.viewForm1.valid){
      setTimeout(() => {
        this.procedure.list('client', ['email'], {email: this.viewForm1.value.email}).subscribe((res: any[]) => {
          this.display2 = false;
          if (res && res.length> 0) {
            this.view = 2;
          } else {
            this.viewForm3.controls['email'].setValue(this.viewForm1.value.email);
            this.view = 3;
          }
        })
      }, 500);
    }else{
      setTimeout(() => {
        this.display2 = false;
      }, 500);
      this.getFormValidationErrors1();
    }
  }
  registerbuton(){
    this.view = 3;
  }

  register(){
    this.display2 = true;
    this.getFormValidationErrors1();
    // if (this.email != "" && this.password != "") {
      if(this.viewForm2.valid || this.viewForm3.valid){
        this.email = this.viewForm1.value.email;
        if(this.view == 2)
          this.password = this.viewForm2.value.password;
        if(this.view == 3)
          this.password = this.viewForm3.value.temp_password;
        this.procedure.custom('login',{email: this.email, password: btoa(this.password)}).subscribe((res: any) => {
          console.log('que pada',res);
          if (res.length>0) {
            sessionStorage.setItem('data', JSON.stringify(res[0]));
            sessionStorage.setItem('client_id', res[0].id)
            this.setCarLocal();
            this.procedure.login.emit(true);
            this.router.navigateByUrl('/comerce');
            setTimeout(() => {
              this.display2=false;
            }, 500);
          } else {
            this.display2=false;
            this.messageService.add({key: 'bc', severity:'warn', detail: 'Correo y/o contraseña incorrecta'});
            // alert('credenciales incorrectas');
          }
        })
      }else{
        setTimeout(() => {
          this.display2=false;
        }, 500);
        this.getFormValidationErrors2();
      }
    // } else {
    //   alert("Correo y contraseña oligatorios");
    // }
  }

  

  registro(){
    this.display2 = true;
    this.viewForm3.controls['password'].setValue(btoa(this.viewForm3.value.temp_password));
    this.getFormValidationErrors3();
    if(this.viewForm3.valid){
      this.assingData()
      this.procedure.create('client', this.data).subscribe((res: any) => {
        setTimeout(() => {
              this.display2=false;
              if (res['error']) {
                // alert('Verifique los datos')
                this.messageService.add({key: 'bc', severity:'warn', detail: 'Verifique los datos'});
              } else {
                this.messageService.add({key: 'bc', severity:'success', detail: '¡Registro completado!'});
                this.register();
              }
              // console.log(res['error']);
            }, 500);
      })
    }else{
      setTimeout(() => {
              this.display2=false;
            }, 500);
      this.getFormValidationErrors3();
    }
  }

  assingData(){
    this.data.first_name=this.viewForm3.value.first_name;
    this.data.second_name=this.viewForm3.value.second_name;
    this.data.first_surname=this.viewForm3.value.first_surname;
    this.data.second_surname	=this.viewForm3.value.second_surname;
    this.data.email=this.viewForm3.value.email;
    this.data.gender=this.viewForm3.value.gender;
    this.data.birth_date=this.viewForm3.value.birth_date;
    this.data.phone=this.viewForm3.value.phone;
    this.data.password=this.viewForm3.value.password;
    this.data.type_identification=this.viewForm3.value.type_identification;
    this.data.document=this.viewForm3.value.document;
    this.data.address=this.viewForm3.value.address;
  }

  back(op:number){
    if(op==2)
      this.viewForm3.reset();
    if(op==1)
      this.viewForm2.reset();
    this.view = 1;
  }

  getType() {
    this.procedure.list('type_identification',['id', 'name']).subscribe((res: any[]) => {
      console.log(res);
      const vec = res.map((item) => {
        const data =  {name: item.name, code: item.id};
        return data;
      })
      this.types.push(...vec);
    })
  }

  changeType(ev:any) {
    this.viewForm3.controls['type_identification'].setValue(this.viewForm3.value.temp_type_identification.code);
  }

  getFormValidationErrors1() {
    Object.keys(this.viewForm1.controls).forEach(key => {
      this.viewForm1.controls[key].markAsTouched();
      const controlErrors: any = this.viewForm1.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  
  getFormValidationErrors2() {
    Object.keys(this.viewForm2.controls).forEach(key => {
      this.viewForm2.controls[key].markAsTouched();
      const controlErrors: any = this.viewForm2.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  getFormValidationErrors3() {
    Object.keys(this.viewForm3.controls).forEach(key => {
      this.viewForm3.controls[key].markAsTouched();
      const controlErrors: any = this.viewForm3.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  get f1(){
    return this.viewForm1.controls;
  }
  get f2(){
    return this.viewForm2.controls;
  }


  get f3(){
    return this.viewForm3.controls;
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

