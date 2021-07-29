import { UserInterface } from '../interfaces/interfaces';
import { Utils } from './utils.class';

export class User {
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
			isAdmin: this.isAdmin
		};
	}
}
