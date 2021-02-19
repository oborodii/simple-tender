export interface TenderUser {
  localId?: string;                   // id in database
  email: string;                      // user login (email)
  emailVerified?: boolean;            // whether or not the account's email has been verified
  password?: string;                  // user password
  passwordHash?: string;              // hash version of password
  displayName?: string;               // displayed company name
  phone?: string;                     // user phone
  createdAt?: number | Date;          // date when this user was created
  lastLoginAt?: number | Date;        // the timestamp in milliseconds (or the date), that the account last logged in at
  lastRefreshAt?: number | Date;      // the timestamp in milliseconds (or the date), that the account last refreshed in at
  passwordUpdatedAt?: number | Date;  // the timestamp in milliseconds (or the date), that the account password was last changed
  providerUserInfo?: TenderUser[];    // list of all linked provider objects which contain "providerId" and "federatedId"
  validSince?: number | Date;         // the timestamp in seconds, which marks a boundary, before which ID token are considered revoked
  returnSecureToken?: boolean;        // whether or not to return an ID and refresh token (should always be true for Firebase)
  disabled?: boolean;                 // whether the account is disabled or not
}
