import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value === -1) { return '∞'; }

    const hours = Math.floor(value / 3600);
    let timeLeft = value % 3600;
    const minutes = Math.floor(timeLeft / 60);
    timeLeft = timeLeft % 60;
    const seconds = timeLeft;

    return `${hours}:${minutes}:${seconds}`;
  }
}
