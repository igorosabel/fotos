import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('src/app/pages/list/list.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('src/app/pages/add/add.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('src/app/pages/login/login.component'),
  },
  {
    path: 'users',
    loadComponent: () => import('src/app/pages/users/users.component'),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
