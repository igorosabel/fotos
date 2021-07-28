/*
 * Páginas
 */
import { AddComponent } from 'src/app/pages/add/add.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { ListComponent } from 'src/app/pages/list/list.component';

export const PAGES: any[] = [
	AddComponent,
	LoginComponent,
	DetailComponent,
	ListComponent
];

/*
 * Componentes parciales
 */
export const COMPONENTS: any[] = [];

/*
 * Pipes
 */
export const PIPES: any[] = [];

/*
 * Servicios
 */
import { ApiService } from 'src/app/services/api.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { UserService } from 'src/app/services/user.service';
import { ClassMapperService } from './services/class-mapper.service';

export const SERVICES: any[] = [
	UserService,
	DataShareService,
	ApiService,
	ClassMapperService
];

/*
 * Componentes Angular Material
 */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const MATERIAL: any[] = [
	MatToolbarModule,
	MatSidenavModule,
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule
];
