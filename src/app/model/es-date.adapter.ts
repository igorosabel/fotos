import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { Utils } from 'src/app/model/utils.class';

@Injectable()
export class EsDateAdapter extends NativeDateAdapter {
	format(date: Date, displayFormat: Object): string {
		let year = date.getFullYear();
		let month = Utils.formatZeroNumber(date.getMonth() +1);
		let day = Utils.formatZeroNumber(date.getDate());

		return `${day}/${month}/${year}`;
	}

	getFirstDayOfWeek(): number {
		return 1;
	}
}
