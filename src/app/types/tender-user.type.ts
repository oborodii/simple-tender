export interface TenderUser {
  id?: number;                    // id in database
  email: string;                 // user login (email)
  password: string;               // user password
  name?: string;                  // user name
  surname?: string;               // user surname
  phone?: string;                 // user phone
  companyName?: string;           // the company the user works for
  dateCreate?: number | Date;     // date when this user was created
}
