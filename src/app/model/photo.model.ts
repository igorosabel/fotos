import {
  PhotoInterface,
  TagInterface
} from '../interfaces/interfaces';
import { Tag } from './tag.model';

export class Photo {
  constructor(
    public id: number = -1,
    public thumb: string = '',
    public img: string = '',
    public tags: Tag[] = []
  ) { }

  toInterface(): PhotoInterface {
    const tags: TagInterface[] = [];
    for (let t of this.tags) {
      tags.push(t.toInterface());
    }

    return {
      id: this.id,
      thumb: this.thumb,
      img: this.img,
      tags: tags
    };
  }
}