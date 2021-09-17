import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/list/list.component';
import { UsersComponent } from 'src/app/pages/users/users.component';

const routes: Routes = [
	{ path: '', component: ListComponent },
	{ path: 'add', component: AddComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'users', component: UsersComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
