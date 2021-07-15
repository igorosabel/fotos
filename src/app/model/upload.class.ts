export class Upload {
	status: string = 'no';
	uploaded: number = 0;

	constructor(
		public src: string = ''
	) {}
}