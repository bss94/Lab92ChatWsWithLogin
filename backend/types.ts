import {Model} from 'mongoose';
import {WebSocket} from 'ws';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;

export interface OnlineUser {
  _id: string;
  username: string;
  role: string;
}

export interface ConnectedClients {
  ws: WebSocket,
  user: OnlineUser,
}
