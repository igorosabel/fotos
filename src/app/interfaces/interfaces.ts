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