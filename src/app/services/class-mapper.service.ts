import { Injectable } from '@angular/core';
import { Photo } from 'src/app/model/photo.model';
import { Tag } from 'src/app/model/tag.model';
import { User } from 'src/app/model/user.model';
import {
	PhotoInterface,
	TagInterface,
	UserInterface
} from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getPhotos(ps: PhotoInterface[]): Photo[] {
		const photos: Photo[] = [];

		for (let p of ps) {
			photos.push(this.getPhoto(p));
		}

		return photos;
	}

	getPhoto(p: PhotoInterface): Photo {
		return new Photo(
			p.id,
			p.thumb,
			p.img,
			p.date,
			this.getTags(p.tags)
		);
	}

	getTags(ts: TagInterface[]): Tag[] {
		const tags: Tag[] = [];

		for (let t of ts) {
			tags.push(this.getTag(t));
		}

		return tags;
	}

	getTag(t: TagInterface): Tag {
		return new Tag(
			t.id,
			Utils.urldecode(t.tag)
		);
	}

	getUser(u: UserInterface): User {
		return new User(
			u.id,
			Utils.urldecode(u.username),
			Utils.urldecode(u.name),
			u.token,
			u.isAdmin
		);
	}
}
