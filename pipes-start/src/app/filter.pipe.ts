import { Pipe, PipeTransform } from '@angular/core';
import { resourceLimits } from 'worker_threads';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string, propName: string): any {
    if(value.length === 0){
      return value;
    }
    const resultArray = [];

    for(const item of value){
      if(item[propName] === filter){
        resultArray.push(item);
      }
    }
    return resultArray

  }

}
