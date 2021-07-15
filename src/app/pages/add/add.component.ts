import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	name: string = '';
	list: String[] = [];

	constructor(private us: UserService, private router: Router) {}

	ngOnInit(): void {
		this.us.loadLogin();
		if (!this.us.logged) {
			this.router.navigate(['/admin']);
		}
		else {
			this.name = this.us.user.name;
		}
	}

	addNew(): void {
		const obj = document.getElementById('add-files');
		obj && obj.click();
	}

	onFileChange(event: Event) {
		const target = (<HTMLInputElement>event.target);
		if ( target !== null && target.files !== null && target.files.length > 0) {
			for (let file of target.files) {
				this.readFile(file);
			}
		}
	}

	readFile(file: File) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.list.push(reader.result as string);
			(<HTMLInputElement>document.getElementById('add-files')).value = '';
		};
	}
}
