import User from '../models/user.model';
import BaseCtrl from './base.controller';

export default class UserCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = User;
  }
}
