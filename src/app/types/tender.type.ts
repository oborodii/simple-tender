import { TenderUser } from './tender-user.type';
import { TenderStatus } from './tender-status.type';
import { Lot } from './lot.type';

export interface Tender {
  id?: number;                          // id в базе данных
  dateCreate?: number | Date;           // дата создания тендера
  dateStart: string | number | Date;    // дата запуска тендера
  dateEnd: string | number | Date;      // дата окончания тендера
  timeStart?: string | number | Date;   // время запуска тендера
  timeEnd?: string | number | Date;     // время окончания тендера
  user?: TenderUser;                    // пользователь, создавший тендер
  title: string;                        // заголовок
  description: string;                  // описание
  status?: TenderStatus;                // 'draft' | 'active' | 'closed' | 'planned' | 'all'
  lots?: Lot[];                         // массив лотов этого тендера
  isShowBestBet?: boolean;              // показывать ли лучшую ставку для всех лотов тендера
}
