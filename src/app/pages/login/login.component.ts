import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LoginData } from '@interfaces/interfaces';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export default class LoginComponent {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);

  login: LoginData = {
    username: '',
    pass: '',
  };

  continue(): void {
    if (this.login.username === '') {
      alert('¡No puedes dejar el nombre de usuario en blanco!');
      return;
    }
    if (this.login.pass === '') {
      alert('¡No puedes dejar la contraseña en blanco!');
      return;
    }

    this.as.login(this.login).subscribe((result) => {
      if (result.status === 'ok') {
        this.us.logged = true;
        this.us.user = this.cms.getUser(result.user);
        this.us.saveLogin();
        this.router.navigate(['/']);
      } else {
        alert('Nombre de usuario o contraseña incorrectos.');
      }
    });
  }
}
