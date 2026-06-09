import { inject, Service } from '@angular/core';
import { UserInterface } from '@interfaces/interfaces';
import User from '@model/user.model';
import ClassMapperService from '@services/class-mapper.service';

@Service()
export default class UserService {
  private readonly cms: ClassMapperService = inject(ClassMapperService);

  logged: boolean = false;
  user: User = new User();

  loadLogin(): void {
    const loginObj: string | null = localStorage.getItem('login');
    if (loginObj === null) {
      this.logout();
    } else {
      this.logged = true;
      const obj: UserInterface = JSON.parse(loginObj);
      this.user = this.cms.getUser(obj);
    }
  }

  saveLogin(): void {
    localStorage.setItem('login', JSON.stringify(this.user.toInterFace()));
  }

  logout(): void {
    this.logged = false;
    this.user = new User();
    localStorage.removeItem('login');
  }
}
