import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], category: number, name: string, ...args: unknown[]): any[] {
    if (category == 0 && name == '') {
      return value;
    }
    if (category!=0 && name=='') {

      return value.filter((item) => {
        return item.id_category==category;
      });
    }

    if (category==0 && name!='') {
      return value.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (category!=0 && name!='') {
      return value.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase()) && item.id_category==category;
      });
    }

    return value;
  }

}
