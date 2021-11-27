import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { User } from 'src/app/model/user.model';
import { UserUpdateInterface } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	idUser: number = -1;
	users: User[] = [];
	displayedColumns: string[] = ['id', 'username', 'name', 'isAdmin', 'options'];
	windowTitle: string = 'Nuevo usuario';
	selectedUser: UserUpdateInterface = {
		id: -1,
		username: '',
		name: '',
		pass: '',
		isAdmin: false
	};
	showOverlay: boolean = false;
	savingUser: boolean = false;

	constructor(
		private us: UserService,
		private as: ApiService,
		private cms: ClassMapperService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.us.loadLogin();
		if (!this.us.logged) {
			this.router.navigate(['/login']);
		}
		this.idUser = this.us.user.id;
		this.loadUsers();
	}

	loadUsers(): void {
		this.as.getUsers().subscribe(result => {
			this.users = this.cms.getUsers(result.list);
		});
	}

	editUser(user: User): void {
		this.windowTitle = 'Nuevo usuario';
		this.selectedUser = user.toUserInterface();
		this.showOverlay = true;
	}

	addUser(): void {
		this.windowTitle = 'Nuevo usuario';
		this.selectedUser = {
			id: -1,
			username: '',
			name: '',
			pass: '',
			isAdmin: false
		};
		this.showOverlay = true;
	}

	closeOverlay(): void {
		this.showOverlay = false;
	}

	saveUser(): void {
		this.savingUser = true;
		this.as.saveUser(this.selectedUser).subscribe(result => {
			this.savingUser = false;
			if (result.status === 'ok') {
				this.closeOverlay();
				this.loadUsers();
				if (this.selectedUser.id === this.idUser) {
					this.us.user.username = this.selectedUser.username;
					this.us.user.name = this.selectedUser.name;
					this.us.user.isAdmin = this.selectedUser.isAdmin;
					this.us.saveLogin();

					if (!this.us.user.isAdmin) {
						this.router.navigate(['/']);
					}
				}
			}
			else {
				alert('¡Ocurrió un error al guardar los datos! Vuelve a intentarlo en unos minutos.');
			}
		});
	}
}
