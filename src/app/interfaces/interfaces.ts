export interface DataShareGlobals {
  [key: string]: any;
}

export interface LoginData {
  username: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  user: UserInterface;
}

export interface UserInterface {
  id: number;
  username: string | null;
  name: string | null;
  token: string;
  isAdmin: boolean;
}

export interface PhotoInterface {
  id: number;
  thumb: string;
  img: string;
  date: number;
  tags: TagInterface[];
}

export interface TagInterface {
  id: number;
  tag: string;
}

export interface PhotosResult {
  status: string;
  pages: number;
  list: PhotoInterface[];
}

export interface TagsResult {
  status: string;
  list: TagInterface[];
}

export interface StatusResult {
  status: string;
}

export interface PhotoResult {
  status: string;
  photo: PhotoInterface;
}

export interface UploadInterface {
  src: string;
  date: string;
  exif: string;
}

export interface UserResult {
  status: string;
  list: UserInterface[];
}

export interface UserUpdateInterface {
  id: number;
  username: string;
  name: string;
  pass: string;
  isAdmin: boolean;
}
