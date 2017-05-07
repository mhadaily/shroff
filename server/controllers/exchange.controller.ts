import Exchange from '../models/exchange.model';
import BaseCtrl from './base.controller';

export default class ExchangeCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = Exchange;
  }
}
