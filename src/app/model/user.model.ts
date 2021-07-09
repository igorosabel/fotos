import { UserInterface } from '../interfaces/interfaces';

export class User {
  constructor(
    public id: number = -1,
    public username: string = '',
    public name: string = ''
  ) { }

  toInterFace(): UserInterface {
    return {
      id: this.id,
      username: this.username,
      name: this.name
    };
  }
}