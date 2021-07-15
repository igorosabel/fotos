import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { Upload } from 'src/app/model/upload.class';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	name: string = '';
	list: Upload[] = [];
	currentUploading: number = 0;
	uploading: boolean = false;

	constructor(private us: UserService, private as: ApiService, private router: Router) {}

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

	onFileChange(event: Event): void {
		const target = (<HTMLInputElement>event.target);
		if ( target !== null && target.files !== null && target.files.length > 0) {
			for (let file of target.files) {
				this.readFile(file);
			}
		}
	}

	readFile(file: File): void {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.list.push(new Upload(reader.result as string));
			(<HTMLInputElement>document.getElementById('add-files')).value = '';
		};
	}
	
	start(): void {
		this.currentUploading = 0;
		this.uploading = true;
		this.uploadSelected();
	}
	
	uploadSelected(): void {
		this.as.upload().subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				// This is an upload progress event. Compute and show the % done:
				const percentDone = Math.round(100 * event.loaded / event.total);
				console.log(`File is ${percentDone}% uploaded.`);
			} else if (event instanceof HttpResponse) {
				console.log('File is completely uploaded!');
			}
		});
	}
}
