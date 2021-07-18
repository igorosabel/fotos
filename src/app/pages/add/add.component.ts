import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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

	calculateUploadWidth(current: number): number {
		return current * 0.9;
	}

	uploadSelected(): void {
		this.list[this.currentUploading].status = 'uploading';
		this.as.upload(this.list[this.currentUploading].src, this.us.user.id).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.list[this.currentUploading].uploaded = this.calculateUploadWidth(Math.round(100 * event.loaded / event.total));
			} else if (event instanceof HttpResponse) {
				if (event.body.status === 'ok') {
					this.currentUploading++;
					if (this.currentUploading > (this.list.length -1)) {
						alert('Fotos subidas');
						this.list = [];
						this.currentUploading = 0;
					}
					else {
						this.uploadSelected();
					}
				}
				else {
					alert('¡Ocurrió un error al subir la foto!');
					this.list[this.currentUploading].status = 'no';
				}
			}
		});
	}
}
