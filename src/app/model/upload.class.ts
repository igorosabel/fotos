import { UploadInterface } from 'src/app/interfaces/interfaces';

export class Upload {
	status: string = 'no';
	uploaded: number = 0;

	constructor(
		public src: string = '',
		public date: string = ''
	) {}

	toInterface(): UploadInterface {
		return {
			src: '', //this.src,
			date: this.date
		};
	}
}
