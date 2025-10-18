import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { UserResult, UserUpdateInterface } from '@interfaces/interfaces';
import User from '@model/user.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatSlideToggle,
  ],
})
export default class UsersComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);

  idUser: number = -1;
  users: WritableSignal<User[]> = signal<User[]>([]);
  displayedColumns: string[] = ['id', 'username', 'name', 'isAdmin', 'options'];
  windowTitle: WritableSignal<string> = signal<string>('Nuevo usuario');
  selectedUser: UserUpdateInterface = {
    id: -1,
    username: '',
    name: '',
    pass: '',
    isAdmin: false,
  };
  showOverlay: WritableSignal<boolean> = signal<boolean>(false);
  savingUser: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.us.loadLogin();
    if (!this.us.logged) {
      this.router.navigate(['/login']);
    }
    this.idUser = this.us.user.id;
    this.loadUsers();
  }

  loadUsers(): void {
    this.as.getUsers().subscribe((result: UserResult): void => {
      this.users.set(this.cms.getUsers(result.list));
    });
  }

  editUser(user: User): void {
    this.windowTitle.set('Editar usuario');
    this.selectedUser = user.toUserInterface();
    this.showOverlay.set(true);
  }

  addUser(): void {
    this.windowTitle.set('Nuevo usuario');
    this.selectedUser = {
      id: -1,
      username: '',
      name: '',
      pass: '',
      isAdmin: false,
    };
    this.showOverlay.set(true);
  }

  closeOverlay(): void {
    this.showOverlay.set(false);
  }

  saveUser(): void {
    this.savingUser.set(true);
    this.as.saveUser(this.selectedUser).subscribe((result) => {
      this.savingUser.set(false);
      if (result.status === 'ok') {
        this.closeOverlay();
        this.loadUsers();
        if (this.selectedUser.id === this.idUser) {
          this.us.user.username = this.selectedUser.username;
          this.us.user.name = this.selectedUser.name;
          this.us.user.isAdmin = this.selectedUser.isAdmin;
          this.us.saveLogin();

          if (!this.us.user.isAdmin) {
            this.router.navigate(['/']);
          }
        }
      } else {
        alert(
          '¡Ocurrió un error al guardar los datos! Vuelve a intentarlo en unos minutos.'
        );
      }
    });
  }
}
