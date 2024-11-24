import { Injectable } from '@angular/core';
import {
  PhotoInterface,
  TagInterface,
  UserInterface,
} from '@interfaces/interfaces';
import Photo from '@model/photo.model';
import Tag from '@model/tag.model';
import User from '@model/user.model';
import { urldecode } from '@osumi/tools';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
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
    return new Tag(t.id, urldecode(t.tag));
  }

  getUsers(us: UserInterface[]): User[] {
    return us.map((u: UserInterface): User => {
      return this.getUser(u);
    });
  }

  getUser(u: UserInterface): User {
    return new User(
      u.id,
      urldecode(u.username),
      urldecode(u.name),
      u.token,
      u.isAdmin
    );
  }
}
