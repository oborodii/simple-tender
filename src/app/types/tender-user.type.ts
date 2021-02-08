export interface TenderUser {
  id?: number;                    // id in database
  email: string;                  // user login (email)
  password: string;               // user password
  name?: string;                  // user name
  surname?: string;               // user surname
  displayName?: string;           // name+surname
  phone?: string;                 // user phone
  dateCreate?: number | Date;     // date when this user was created
  returnSecureToken?: boolean;    // whether or not to return an ID and refresh token (should always be true for Firebase)
}
