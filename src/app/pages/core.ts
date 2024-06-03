import { Provider } from '@angular/core';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import DataShareService from '@services/data-share.service';
import UserService from '@services/user.service';

export default function provideCore(): Provider[] {
  return [UserService, DataShareService, ApiService, ClassMapperService];
}
