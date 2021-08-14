import { UploadInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

export class Upload {
	status: string = 'no';
	uploaded: number = 0;
	creationDate: Date = new Date();

	constructor(
		public src: string = '',
		public date: string = '',
		public exif: string = ''
	) {
		if (date !== '') {
			let datePieces = date.split(' ');
			let firstPieces = datePieces[0].split(':');
			let lastPieces = datePieces[1].split(':');
			this.creationDate = new Date(
				parseInt(firstPieces[0]),
				parseInt(firstPieces[1]) -1,
				parseInt(firstPieces[2]),
				parseInt(lastPieces[0]),
				parseInt(lastPieces[1]),
				parseInt(lastPieces[2])
			);
		}
	}

	toInterface(): UploadInterface {
		return {
			src: this.src,
			date: (this.date != '') ? Utils.formatDate(this.creationDate, true) : '',
			exif: this.exif
		};
	}
}
