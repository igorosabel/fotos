import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import {
  LoginData,
  LoginResult,
  PhotoResult,
  PhotosResult,
  StatusResult,
  TagsResult,
  UploadInterface,
  UserResult,
  UserUpdateInterface,
} from '@interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  private http: HttpClient = inject(HttpClient);
  apiUrl: string = environment.apiUrl;

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }

  getPhotos(page: number): Observable<PhotosResult> {
    return this.http.post<PhotosResult>(this.apiUrl + 'get-photos', { page });
  }

  getTags(): Observable<TagsResult> {
    return this.http.post<TagsResult>(this.apiUrl + 'get-tags', {});
  }

  upload(data: UploadInterface, id: number): Observable<any> {
    const req = new HttpRequest(
      'POST',
      this.apiUrl + 'upload',
      { data, id },
      {
        reportProgress: true,
      }
    );

    return this.http.request<any>(req);
  }

  updateTags(list: number[], tags: string): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'update-tags', {
      list,
      tags,
    });
  }

  getPhoto(id: number): Observable<PhotoResult> {
    return this.http.post<PhotoResult>(this.apiUrl + 'get-photo', { id });
  }

  getUsers(): Observable<UserResult> {
    return this.http.post<UserResult>(this.apiUrl + 'get-users', {});
  }

  saveUser(user: UserUpdateInterface): Observable<StatusResult> {
    return this.http.post<StatusResult>(this.apiUrl + 'save-user', user);
  }
}
