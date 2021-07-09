import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddComponent } from 'src/app/pages/add/add.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { ListComponent } from 'src/app/pages/list/list.component';
import { ApiService } from 'src/app/services/api.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { UserService } from 'src/app/services/user.service';
import { ClassMapperService } from './services/class-mapper.service';
/*
 * Páginas
 */
export const PAGES: any[] = [
  AddComponent,
  AdminComponent,
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
export const SERVICES: any[] = [
  UserService,
  DataShareService,
  ApiService,
  ClassMapperService
];

/*
 * Componentes Angular Material
 */
export const MATERIAL: any[] = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule
];