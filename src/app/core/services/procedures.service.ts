import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  PATH: string = environment.host;
  search = new EventEmitter<{name: string, category: number}>();
  login = new EventEmitter<boolean>();
  currentData = new EventEmitter<{name: string, category: number}>();

  constructor(private http: HttpClient) { }

  list(table: string, campos: string[], condition: any = null): Observable<any[]> {
    const info: any = {
      "data": {
        "action": "listar",
        table,
        "info": {
          campos,
          /* "additional": {
              "id": 1
          } */
        }
      }
    };
    if ( condition != null) {
      info.data.info.additional = condition;
    }
    return this.http.post<any[]>(this.PATH+'/ruta',info);

  }

  create(table: string, campos: any): Observable<any[]> {
    // console.log(campos);
    const info: any = {
      "data": {
        "action": "insertar",
        table,
        "info": campos
      }
    };
    return this.http.post<any[]>(this.PATH+'/ruta',info);

  }

  update(table: string, campos: any, id: number): Observable<any[]> {
    const info: any = {
      "data": {
        "action": "actualizar",
        table,
        "info": campos
      }
    };
    info.data.info.additional = {id}
    return this.http.post<any[]>(this.PATH+'/ruta',info);

  }

  remove(table: string, id: number) {
    const info: any = {
      "data": {
        "action": "eliminar",
        table,
        "info": {
          "additional": {
            "id": id
        }
        }
      }
    };
    info.data.info.additional = {id}
    return this.http.post<any[]>(this.PATH+'/ruta',info);
  }

  custom(action: string, inf: any = null) {
    const info: any = {
      "data": {
        action,
      }
    };
    if (inf !=null) {
      info.data.info = inf;
    }
    return this.http.post<any[]>(this.PATH+'/custom',info);
  }
}
