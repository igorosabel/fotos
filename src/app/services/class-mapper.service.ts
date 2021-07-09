import { Injectable } from '@angular/core';
import { Photo } from 'src/app/model/photo.model';
import { Tag } from 'src/app/model/tag.model';
import { PhotoInterface, TagInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

@Injectable({
  providedIn: 'root'
})
export class ClassMapperService {
  constructor() { }

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
}