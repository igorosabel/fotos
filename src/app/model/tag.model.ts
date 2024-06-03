import { TagInterface } from '@interfaces/interfaces';

export default class Tag {
  constructor(public id: number = -1, public tag: string = '') {}

  toInterface(): TagInterface {
    return {
      id: this.id,
      tag: this.tag,
    };
  }
}
