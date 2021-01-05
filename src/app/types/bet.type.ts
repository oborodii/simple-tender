export interface Bet {
  id?: number;
  lotId?: number;                         // id лота, на который сделана эта ставка
  userId?: number;                        // кто сделал ставку
  value: number;                          // размер ставки
  comment?: string;                       // комментарий к ставке
  dateTime?: number | string | Date;      // время, когда сделали ставку
}
