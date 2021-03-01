export interface FirebaseRefreshTokenResponse {
  id_token: string;           // A Firebase Auth ID token
  refresh_token: string;      // The Firebase Auth refresh token provided in the request or a new refresh token
  expires_in: string;         // The number of seconds in which the ID token expires
  user_id: string;            // The uid corresponding to the provided ID token
  project_id: string;         // Firebase project ID
  token_type: string;         // The type of the refresh token, always "Bearer"
  access_token?: string;
}
