import { UserInterface, UserUpdateInterface } from '@interfaces/interfaces';
import Utils from '@model/utils.class';

export default class User {
  constructor(
    public id: number = -1,
    public username: string = '',
    public name: string = '',
    public token: string = '',
    public isAdmin: boolean = false
  ) {}

  toInterFace(): UserInterface {
    return {
      id: this.id,
      username: Utils.urlencode(this.username),
      name: Utils.urlencode(this.name),
      token: this.token,
      isAdmin: this.isAdmin,
    };
  }

  toUserInterface(): UserUpdateInterface {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      pass: '',
      isAdmin: this.isAdmin,
    };
  }
}
