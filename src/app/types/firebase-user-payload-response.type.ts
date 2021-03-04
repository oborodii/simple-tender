import { TenderUser } from './tender-user.type';

export interface FirebaseUserPayloadResponse {
  kind: string;
  users: TenderUser[];
}
