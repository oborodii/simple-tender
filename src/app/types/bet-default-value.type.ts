export interface BetDefaultValue {
  /** Min/Max comment length */
  readonly MIN_COMMENT_LENGTH: number;
  readonly MAX_COMMENT_LENGTH: number;

  /** A bet default value */
  readonly VALUE: number;

  /** The bet value maximum limit */
  readonly MAX_BET_VALUE: number;

  /** Comment for a bet default value */
  readonly COMMENT: number | null;
}
