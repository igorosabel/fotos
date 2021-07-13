import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';

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

	constructor(private api: ApiService) {}

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
			console.log(result);
		});
	}
}
