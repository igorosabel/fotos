import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import Utils from '@model/utils.class';

@Injectable()
export default class EsDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const year: number = date.getFullYear();
    const month: string = Utils.formatZeroNumber(date.getMonth() + 1);
    const day: string = Utils.formatZeroNumber(date.getDate());

    return `${day}/${month}/${year}`;
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
