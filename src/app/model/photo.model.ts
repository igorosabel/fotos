import { PhotoInterface, TagInterface } from '@interfaces/interfaces';
import Tag from '@model/tag.model';
import { getDate } from '@osumi/tools';

export default class Photo {
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

  get showDate(): string {
    return getDate({ date: this.photoDate, withSeconds: true });
  }

  toInterface(): PhotoInterface {
    return {
      id: this.id,
      thumb: this.thumb,
      img: this.img,
      date: this.date,
      tags: this.tags.map((t: Tag): TagInterface => {
        return t.toInterface();
      }),
    };
  }
}
