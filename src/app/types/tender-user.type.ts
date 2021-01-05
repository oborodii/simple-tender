export interface TenderUser {
  id?: number;
  login: string;
  email?: string[];
  name: string;
  surname: string;
  phone?: string;
  companyName?: string;
  dateCreate: number | Date;
}
