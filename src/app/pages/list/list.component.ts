import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {
  PhotoInterface,
  PhotosResult,
  TagsResult,
} from '@interfaces/interfaces';
import Photo from '@model/photo.model';
import Tag from '@model/tag.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    RouterLink,
  ],
})
export default class ListComponent implements OnInit {
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
    } else {
      this.isAdmin = this.us.user.isAdmin;

      this.as
        .getPhotos(this.currentPage)
        .subscribe((result: PhotosResult): void => {
          this.numPages = result.pages;
          this.fullList = this.cms.getPhotos(result.list);
          this.filterPhotos();
        });

      this.as.getTags().subscribe((result: TagsResult): void => {
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
    } else {
      this.selectedTag = new Tag();
    }
    this.filterPhotos();
    this.sideNavOpened = false;
  }

  filterPhotos(): void {
    if (this.selectedTag.id == -1) {
      this.list = this.cms.getPhotos(
        this.fullList.map((x: Photo): PhotoInterface => x.toInterface())
      );
    } else {
      this.list = [];
      for (const p of this.fullList) {
        for (const t of p.tags) {
          if (t.id == this.selectedTag.id) {
            this.list.push(this.cms.getPhoto(p.toInterface()));
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
