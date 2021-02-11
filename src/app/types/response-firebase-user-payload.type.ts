import { TenderUser } from './tender-user.type';

export interface ResponseFirebaseUserPayload {
  kind: string;
  users: TenderUser[];
}
