export interface LoginDefaultValue {
  /** Min/Max password length */
  readonly MIN_PASSWORD_LENGTH: number;
  readonly MAX_PASSWORD_LENGTH: number;

  /** Login default value */
  readonly LOGIN: string | null;

  /** Password default value */
  readonly PASSWORD: string | null;
}
