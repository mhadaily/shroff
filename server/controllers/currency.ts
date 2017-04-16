import Currency from '../models/currency.model';
import BaseCtrl from './base';

export default class CurrencyCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = Currency;
  }
}
