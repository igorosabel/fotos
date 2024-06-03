import { Component, OnInit } from '@angular/core';
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
import { UserUpdateInterface } from '@interfaces/interfaces';
import User from '@model/user.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
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
  idUser: number = -1;
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'name', 'isAdmin', 'options'];
  windowTitle: string = 'Nuevo usuario';
  selectedUser: UserUpdateInterface = {
    id: -1,
    username: '',
    name: '',
    pass: '',
    isAdmin: false,
  };
  showOverlay: boolean = false;
  savingUser: boolean = false;

  constructor(
    private us: UserService,
    private as: ApiService,
    private cms: ClassMapperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.us.loadLogin();
    if (!this.us.logged) {
      this.router.navigate(['/login']);
    }
    this.idUser = this.us.user.id;
    this.loadUsers();
  }

  loadUsers(): void {
    this.as.getUsers().subscribe((result) => {
      this.users = this.cms.getUsers(result.list);
    });
  }

  editUser(user: User): void {
    this.windowTitle = 'Nuevo usuario';
    this.selectedUser = user.toUserInterface();
    this.showOverlay = true;
  }

  addUser(): void {
    this.windowTitle = 'Nuevo usuario';
    this.selectedUser = {
      id: -1,
      username: '',
      name: '',
      pass: '',
      isAdmin: false,
    };
    this.showOverlay = true;
  }

  closeOverlay(): void {
    this.showOverlay = false;
  }

  saveUser(): void {
    this.savingUser = true;
    this.as.saveUser(this.selectedUser).subscribe((result) => {
      this.savingUser = false;
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
