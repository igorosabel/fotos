import { Injectable } from '@angular/core';
import { LoginResult } from '../interfaces/interfaces';
import { DataShareService } from './data-share.service';

@Injectable()
export class UserService {
	logged: boolean = false;
	id: number = -1;
	name: string = '';
	token: string = '';

	constructor(private dss: DataShareService) {}

	loadLogin(): void {
		const loginObj = this.dss.getGlobal('login');
		if (loginObj === null) {
			this.logout();
		}
		else {
			this.logged = true;
			this.id = loginObj.id;
			this.name = loginObj.name;
			this.token = loginObj.token;
		}
	}

	saveLogin(): void {
		const loginObj: LoginResult = {
			status: 'ok',
			id: this.id,
			name: this.name,
			token: this.token
		};
		this.dss.setGlobal('login', loginObj);
	}

	logout(): void {
		this.logged = false;
		this.id = -1;
		this.name = '';
		this.token = '';
		this.dss.removeGlobal('login');
	}
}
