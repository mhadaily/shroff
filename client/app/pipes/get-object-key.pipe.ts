import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObjectKey'
})
export class GetObjectKeyPipe implements PipeTransform {

  transform(object: object): any {
    return Object.keys(object);
  }

}
