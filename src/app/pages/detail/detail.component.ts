import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { Photo } from 'src/app/model/photo.model';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
	photo: Photo = new Photo();

	constructor(
		private activatedRoute: ActivatedRoute,
		private as: ApiService,
		private cms: ClassMapperService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			const id = params.id;

			this.as.getPhoto(id).subscribe(result => {
				this.photo = this.cms.getPhoto(result.photo);
			});
		});
	}
}
