import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/list/list.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('@pages/add/add.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/login/login.component'),
  },
  {
    path: 'users',
    loadComponent: () => import('@pages/users/users.component'),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
export default routes;
