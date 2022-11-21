import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { Utils } from 'src/app/model/utils.class';

@Injectable()
export class EsDateAdapter extends NativeDateAdapter {
  /*constructor() {
		super();
	}*/

  format(date: Date, displayFormat: Object): string {
    const year: number = date.getFullYear();
    const month: string = Utils.formatZeroNumber(date.getMonth() + 1);
    const day: string = Utils.formatZeroNumber(date.getDate());

    return `${day}/${month}/${year}`;
  }

  getFirstDayOfWeek(): number {
    return 1;
  }
}
