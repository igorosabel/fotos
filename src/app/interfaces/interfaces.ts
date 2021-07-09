export interface DataShareGlobals {
  [key: string]: any;
}

export interface LoginData {
  name: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  id: number;
  name: string;
  token: string;
}

export interface UserInterface {
  id: number;
  username: string;
  name: string;
}

export interface PhotoInterface {
  id: number;
  thumb: string;
  img: string;
  tags: TagInterface[];
}

export interface TagInterface {
  id: number;
  tag: string;
}

export interface PhotosResult {
  status: string;
  list: PhotoInterface[];
}