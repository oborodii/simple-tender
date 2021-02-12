export interface TenderBet {
  id?: number;
  tenderId?: number;                      // id of the tender
  userId?: number;                        // user who placed this bet
  dateTime?: number | string | Date;      // date and time when the bet was placed
  value: number;                          // bet value
  comment?: string;                       // bet comment
}
