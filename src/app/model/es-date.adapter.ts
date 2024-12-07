import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export default class EsDateAdapter extends NativeDateAdapter {
  formatZeroNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  override format(date: Date, displayFormat: object): string {
    const year: number = date.getFullYear();
    const month: string = this.formatZeroNumber(date.getMonth() + 1);
    const day: string = this.formatZeroNumber(date.getDate());

    return `${day}/${month}/${year}`;
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
