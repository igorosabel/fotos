import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/model/photo.model';
import { Tag } from 'src/app/model/tag.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	isAdmin: boolean = false;
	currentPage: number = 1;
	numPages: number = 0;
	list: Photo[] = [];
	tags: Tag[] = [];
	showPhoto: boolean = false;
	selectedPhoto: Photo = new Photo();

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
		else {
			this.isAdmin = this.us.user.isAdmin;

			this.as.getPhotos(this.currentPage).subscribe(result => {
				this.numPages = result.pages;
				this.list = this.cms.getPhotos(result.list);
			});

			this.as.getTags().subscribe(result => {
				this.tags = this.cms.getTags(result.list);
			});
		}
	}

	selectPhoto(ev: MouseEvent, photo: Photo): void {
		ev && ev.preventDefault();
		this.selectedPhoto = photo;
		this.showPhoto = true;
	}

	closePhoto(): void {
		this.showPhoto = false;
	}

	selectTag(tag: Tag): void {
		console.log(tag);
	}
}
