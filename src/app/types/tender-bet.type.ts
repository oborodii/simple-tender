export interface TenderBet {
  id?: string;
  tenderId?: string;                      // id of the tender
  userId?: string;                        // user who placed this bet
  dateTime?: number | string | Date;      // date and time when the bet was placed
  value: number;                          // bet value
  comment?: string;                       // bet comment
}
