import Exchange from '../models/exchange.model';
import BaseCtrl from './base';

export default class ExchangeCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = Exchange;
  }
}
