import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/model/photo.model';
import { Tag } from 'src/app/model/tag.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  currentPage: number = 1;
  numPages: number = 0;
  list: Photo[] = [];
  tags: Tag[] = [];

  constructor(private as: ApiService, private cms: ClassMapperService) { }

  ngOnInit(): void {
    this.as.getPhotos(this.currentPage).subscribe(result => {
      this.numPages = result.pages;
      this.list = this.cms.getPhotos(result.list);
    });

    this.as.getTags().subscribe(result => {
      this.tags = this.cms.getTags(result.list);
    });
  }
}