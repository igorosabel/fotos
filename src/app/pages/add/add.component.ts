import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { Upload } from 'src/app/model/upload.class';

import { imageData } from './imageData';

declare var EXIF: any;

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
	uploaded: number[] = [];
	tags: string = '';

	@ViewChild('img', { static: true }) imgEl!: ElementRef;
	data = imageData;

	constructor(
		private us: UserService,
		private as: ApiService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.us.loadLogin();
		if (!this.us.logged) {
			this.router.navigate(['/login']);
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
			let result = reader.result as string;
			this.data = result;
			this.list.push(new Upload(result));
			let img = document.createElement('img');
			img.src = imageData;
			this.getExif(img);
			(<HTMLInputElement>document.getElementById('add-files')).value = '';
		};
	}

	getExif(img: HTMLImageElement) {
		// https://stackoverflow.com/questions/54588349/read-image-exif-data-in-angular-6/56475586
		let allMetaData: any;
		console.log(img);
		EXIF.getData(<HTMLImageElement>this.imgEl.nativeElement, function (this: any) {
			allMetaData = EXIF.getAllTags(this);
		});
		console.log(allMetaData);
	}

	deletePhoto(ind: number): void {
		const conf = confirm('¿Estás seguro de querer borrar esta foto?');
		if (conf) {
			this.list.splice(ind, 1);
		}
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
					// Añado id de la foto añadida a la lista
					this.uploaded.push(event.body.id);
					// Marco la foto como subida
					this.list[this.currentUploading].status = 'done';

					this.currentUploading++;
					if (this.currentUploading > (this.list.length -1)) {
						this.updateTags();
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

	updateTags(): void {
		if (this.tags !== '') {
			this.as.updateTags(this.uploaded, this.tags).subscribe(result => {
				if (result.status == 'ok') {
					this.uploadDone();
				}
				else {
					alert('¡Ocurrió un error al actualizar las etiquetas!');
				}
			});
		}
		else {
			this.uploadDone();
		}
	}

	uploadDone(): void {
		alert('Fotos subidas');
		this.list = [];
		this.currentUploading = 0;
		this.uploaded = [];
		this.tags = '';
		this.uploading =  false;
	}
}
