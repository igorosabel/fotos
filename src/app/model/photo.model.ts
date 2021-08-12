import {
	PhotoInterface,
	TagInterface
} from '../interfaces/interfaces';
import { Tag } from './tag.model';

export class Photo {
	photoDate: Date = new Date();

	constructor(
		public id: number = -1,
		public thumb: string = '',
		public img: string = '',
		public date: number = 0,
		public tags: Tag[] = []
	) {
		this.photoDate = new Date(date * 1000);
	}

	toInterface(): PhotoInterface {
		const tags: TagInterface[] = [];
		for (let t of this.tags) {
			tags.push(t.toInterface());
		}

		return {
			id: this.id,
			thumb: this.thumb,
			img: this.img,
			date: this.date,
			tags: tags
		};
	}
}
