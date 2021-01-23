import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uepoch'
})
export class UepochPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): Date {
    return new Date(value * 1000);
  }
}
