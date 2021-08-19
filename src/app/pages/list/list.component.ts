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
	sideNavOpened: boolean = false;
	isAdmin: boolean = false;
	currentPage: number = 1;
	numPages: number = 0;
	list: Photo[] = [];
	fullList: Photo[] = [];
	tags: Tag[] = [];
	selectedTag: Tag = new Tag();
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
				this.fullList = this.cms.getPhotos(result.list);
				this.filterPhotos();
			});

			this.as.getTags().subscribe(result => {
				this.tags = this.cms.getTags(result.list);
			});
		}
	}

	openSideNav(): void {
		this.sideNavOpened = true;
	}

	selectPhoto(photo: Photo): void {
		this.selectedPhoto = photo;
		this.showPhoto = true;
	}

	closePhoto(): void {
		this.showPhoto = false;
	}

	previousPhoto(ev: any): void {
		console.log(ev);
		console.log(typeof ev);
		alert(typeof ev);
	}

	nextPhoto(ev: any): void {
		console.log(ev);
		console.log(typeof ev);
		alert(typeof ev);
	}

	selectTag(tag: Tag | null, ev: MouseEvent): void {
		ev && ev.preventDefault();
		console.log(tag);
		if (tag !== null) {
			this.selectedTag = tag;
		}
		else {
			this.selectedTag = new Tag();
		}
		this.filterPhotos();
		this.sideNavOpened = false;
	}

	filterPhotos(): void {
		if (this.selectedTag.id == -1) {
			this.list = this.cms.getPhotos( this.fullList.map(x => x.toInterface()) );
		}
		else {
			this.list = [];
			for (let p of this.fullList) {
				for (let t of p.tags) {
					if (t.id == this.selectedTag.id) {
						this.list.push( this.cms.getPhoto(p.toInterface()) );
						break;
					}
				}
			}
		}
	}

	logout(): void {
		this.us.logout();
		this.router.navigate(['/login']);
	}
}
