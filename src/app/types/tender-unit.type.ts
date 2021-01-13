// in what units the goods are measured
export interface TenderUnit {
  id: number;
  codeUA: string;       // 'кг', 'шт', 'л', 'м'
  codeEN: string;       // 'kg', 'pcs', 'L', 'm'
  nameUA: string;       // 'кілограм', 'штука', 'літр', 'метр'
  nameEN: string;       // 'kilogram', 'piece', 'liter', 'meter'
}
