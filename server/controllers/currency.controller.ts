import Currency from '../models/currency.model';
import BaseCtrl from './base.controller';

export default class CurrencyCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = Currency;
  }
}
