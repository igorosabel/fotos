import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/model/photo.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  currentPage: number = 1;
  list: Photo[] = [];

  constructor(private as: ApiService, private cms: ClassMapperService) { }

  ngOnInit(): void {
    this.as.getPhotos(this.currentPage).subscribe(result => {
      this.list = this.cms.getPhotos(result.list);
    });
  }
}