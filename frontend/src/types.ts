export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface OnlineUser {
  _id: string;
  username: string;
  role: string;
}

export interface Author {
  _id: string;
  username: string;
}

export interface Message {
  _id: string;
  author: Author;
  message: string;
  datetime: string;
  private?: string;
}