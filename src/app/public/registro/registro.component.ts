import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAngleLeft, faBars, faCartShopping, faPowerOff, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { ProceduresService } from 'src/app/core/services/procedures.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{

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
    email: '',
    name: '',
    password: '',
  }

  types: any[] = [
    {
      name: 'Seleccionar', code:''
    }
  ];
  selectedTypes: any = null;
  display2: boolean = false;




  usuario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private procedure: ProceduresService,
    private messageService: MessageService){
    this.usuario = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required), 
    })
  }
  ngOnInit(){
    
    
  }

  onSubmit(){

    console.log(this.usuario.value);
  }

  capturarDatos() {
    if(this.usuario.invalid){return;}
    var formData = new FormData();
    console.log(this.usuario)
    Object.entries(this.usuario.value).forEach(([key, value]:any) => {
      console.log(key, value)
      formData.append(key, value);
    });


    this.reset();

  }

  reset(){
    this.usuario.reset();
  }
  get f(){
    return this.usuario.controls;
  }

  search(){
    const data = {
      name: this.textSearch,
      category: this.selectedCity.code
    }
    this.procedure.search.emit(data)
    this.router.navigate(['/comerce'], {queryParams: {textSearch: data.name, category:data.category}});
  }

  registerbuton(){
    this.view = 3;
  }

  register(){
    // if (this.email != "" && this.password != "") {
      //if(this.usuarioLogin.valid || this.viewForm3.valid){
        this.email = this.usuario.value.email;
        if(this.view == 2)
          this.password = this.usuario.value.password;
        if(this.view == 3)
          this.password = this.usuario.value.temp_password;
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
/*       }else{
        setTimeout(() => {
          this.display2=false;
        }, 500);
        this.getFormValidationErrors2();
      } */


    // } else {
    //   alert("Correo y contraseña oligatorios");
    // }
  }

  

  registro(){
    this.usuario.controls['password'].setValue(btoa(this.usuario.value.temp_password));
    this.getFormValidationErrors3();
    if(this.usuario.valid){
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
    this.data.name=this.usuario.value.first_name;
    this.data.email=this.usuario.value.email;
    this.data.password=this.usuario.value.password;
  }

  back(op:number){
    if(op==2)
      this.usuario.reset();
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
    this.usuario.controls['type_identification'].setValue(this.usuario.value.temp_type_identification.code);
  }

  getFormValidationErrors3() {
    Object.keys(this.usuario.controls).forEach(key => {
      this.usuario.controls[key].markAsTouched();
      const controlErrors: any = this.usuario.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  get f3(){
    return this.usuario.controls;
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