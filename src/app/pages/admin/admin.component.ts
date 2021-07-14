import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	login: LoginData = {
		username: '',
		pass: ''
	};

	constructor(
		private api: ApiService,
		private us: UserService,
		private cms: ClassMapperService,
		private router: Router
	) {}

	ngOnInit(): void {}

	continue(): void {
		if (this.login.username === '') {
			alert('¡No puedes dejar el nombre de usuario en blanco!');
			return;
		}
		if (this.login.pass === '') {
			alert('¡No puedes dejar la contraseña en blanco!');
			return;
		}

		this.api.login(this.login).subscribe(result => {
			if (result.status === 'ok') {
				this.us.logged = true;
				this.us.user = this.cms.getUser(result.user);
				this.us.saveLogin();
				this.router.navigate(['/']);
			}
			else {
				alert('Nombre de usuario o contraseña incorrectos.');
			}
		});
	}
}
