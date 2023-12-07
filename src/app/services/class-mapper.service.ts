import { Injectable } from '@angular/core';
import {
  PhotoInterface,
  TagInterface,
  UserInterface,
} from 'src/app/interfaces/interfaces';
import { Photo } from 'src/app/model/photo.model';
import { Tag } from 'src/app/model/tag.model';
import { User } from 'src/app/model/user.model';
import { Utils } from 'src/app/model/utils.class';

@Injectable({
  providedIn: 'root',
})
export class ClassMapperService {
  constructor() {}

  getPhotos(ps: PhotoInterface[]): Photo[] {
    return ps.map((p: PhotoInterface): Photo => {
      return this.getPhoto(p);
    });
  }

  getPhoto(p: PhotoInterface): Photo {
    return new Photo(p.id, p.thumb, p.img, p.date, this.getTags(p.tags));
  }

  getTags(ts: TagInterface[]): Tag[] {
    return ts.map((t: TagInterface): Tag => {
      return this.getTag(t);
    });
  }

  getTag(t: TagInterface): Tag {
    return new Tag(t.id, Utils.urldecode(t.tag));
  }

  getUsers(us: UserInterface[]): User[] {
    return us.map((u: UserInterface): User => {
      return this.getUser(u);
    });
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
