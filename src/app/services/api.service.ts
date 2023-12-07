import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
} from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
