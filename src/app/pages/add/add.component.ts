import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	constructor(private user: UserService, private router: Router) {}

	ngOnInit(): void {
		this.user.loadLogin();
		if (!this.user.logged) {
			this.router.navigate(['/admin']);
		}
	}
}
