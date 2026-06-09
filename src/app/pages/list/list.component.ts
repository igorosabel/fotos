import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { PhotoInterface, PhotosResult, TagsResult } from '@interfaces/interfaces';
import Photo from '@model/photo.model';
import Tag from '@model/tag.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterLink,
  ],
})
export default class ListComponent implements OnInit {
  private us: UserService = inject(UserService);
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);

  sideNavOpened: WritableSignal<boolean> = signal<boolean>(false);
  isAdmin: WritableSignal<boolean> = signal<boolean>(false);
  currentPage: number = 1;
  numPages: number = 0;
  list: WritableSignal<Photo[]> = signal<Photo[]>([]);
  fullList: WritableSignal<Photo[]> = signal<Photo[]>([]);
  tags: WritableSignal<Tag[]> = signal<Tag[]>([]);
  selectedTag: WritableSignal<Tag> = signal<Tag>(new Tag());
  showPhoto: WritableSignal<boolean> = signal<boolean>(false);
  selectedPhoto: Photo = new Photo();
  private readonly swipeThreshold: number = 50;
  private photoSwipeStartX: number | null = null;

  ngOnInit(): void {
    this.us.loadLogin();
    if (!this.us.logged) {
      this.router.navigate(['/login']);
    } else {
      this.isAdmin.set(this.us.user.isAdmin);

      this.as.getPhotos(this.currentPage).subscribe((result: PhotosResult): void => {
        this.numPages = result.pages;
        this.fullList.set(this.cms.getPhotos(result.list));
        this.filterPhotos();
      });

      this.as.getTags().subscribe((result: TagsResult): void => {
        this.tags.set(this.cms.getTags(result.list));
      });
    }
  }

  openSideNav(): void {
    this.sideNavOpened.set(true);
  }

  selectPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
    this.showPhoto.set(true);
  }

  closePhoto(): void {
    this.showPhoto.set(false);
  }

  onPhotoPointerDown(ev: PointerEvent): void {
    this.photoSwipeStartX = ev.clientX;
  }

  onPhotoPointerUp(ev: PointerEvent): void {
    if (this.photoSwipeStartX === null) {
      return;
    }

    const swipeDistance = ev.clientX - this.photoSwipeStartX;
    this.photoSwipeStartX = null;

    if (Math.abs(swipeDistance) < this.swipeThreshold) {
      return;
    }

    ev.stopPropagation();
    if (swipeDistance > 0) {
      this.previousPhoto();
    } else {
      this.nextPhoto();
    }
  }

  previousPhoto(): void {
    this.selectPhotoByOffset(-1);
  }

  nextPhoto(): void {
    this.selectPhotoByOffset(1);
  }

  private selectPhotoByOffset(offset: number): void {
    const photos = this.list();
    if (photos.length === 0) {
      return;
    }

    const currentIndex = photos.findIndex((photo: Photo): boolean => photo.id === this.selectedPhoto.id);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + offset + photos.length) % photos.length;
    this.selectedPhoto = photos[nextIndex];
  }

  selectTag(tag: Tag | null, ev: MouseEvent): void {
    if (ev) {
      ev.preventDefault();
    }
    console.log(tag);
    if (tag !== null) {
      this.selectedTag.set(tag);
    } else {
      this.selectedTag.set(new Tag());
    }
    this.filterPhotos();
    this.sideNavOpened.set(false);
  }

  filterPhotos(): void {
    if (this.selectedTag().id == -1) {
      this.list.set(
        this.cms.getPhotos(this.fullList().map((x: Photo): PhotoInterface => x.toInterface())),
      );
    } else {
      const list: Photo[] = [];
      for (const p of this.fullList()) {
        for (const t of p.tags) {
          if (t.id == this.selectedTag().id) {
            list.push(this.cms.getPhoto(p.toInterface()));
            break;
          }
        }
      }
      this.list.set(list);
    }
  }

  logout(): void {
    this.us.logout();
    this.router.navigate(['/login']);
  }
}
