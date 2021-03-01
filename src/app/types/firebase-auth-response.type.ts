export interface FirebaseAuthResponse {
  idToken: string;              // a Firebase Auth ID token for the authenticated user
  refreshToken: string;         // a Firebase Auth refresh token for the authenticated user
  expiresIn: string | number;   // the number of seconds in which the ID token expires
  email?: string;               // the email for the authenticated user
  displayName?: string;         // user display name
  localId?: string;             // the uid of the authenticated user
  kind?: string;                // for example: "identitytoolkit#VerifyPasswordResponse"
  registered?: boolean;         // whether the email is for an existing account
}
