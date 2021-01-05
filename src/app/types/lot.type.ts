import { TenderCurrency } from './tender-currency.type';
import { LotUnit } from './lot-unit.type';
import { LotCategory } from './lot-category.type';
import { Bet } from './bet.type';

export interface Lot {
  id?: number;                                // id записи в базе данных
  auctionId?: number;                         // id тендера, в котором находится лот
  title: string;                              // заголовок
  description?: string;                       // описание
  expectedValue?: number;                     // ожидаемая сумма по лоту
  stepValue?: number;                         // шаг ставки
  quantity?: number;                          // количество товара
  unit?: LotUnit;                             // в каких единицах измеряется товар лота
  currency: TenderCurrency;                   // валюта лота
  category: LotCategory;                      // категория лота
  bestBet?: Bet;                              // лучшая ставка
  currentBet?: Bet;                           // введенная пользователем и пока не сохраненная ставка
  bets?: Bet[];                               // все ставки по лоту
  isLotExpanded?: boolean;                    // раскрыт ли этот лот на странице тендера
  isBetTableExpanded?: boolean;               // раскрыта ли таблица ставок этого лота
}
