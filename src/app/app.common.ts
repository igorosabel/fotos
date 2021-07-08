/*
 * Páginas
 */
import { AddComponent } from './pages/add/add.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { DataShareService } from './services/data-share.service';
/*
 * Servicios
 */
import { UserService } from './services/user.service';

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

export const SERVICES: any[] = [
  UserService,
  DataShareService
];

/*
 * Componentes Angular Material
 */
export const MATERIAL: any[] = [];