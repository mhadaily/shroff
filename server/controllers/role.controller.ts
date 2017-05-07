import Role from '../models/role.model';
import BaseCtrl from './base.controller';

export default class RoleCtrl extends BaseCtrl {
  model: any;

  constructor() {
    super();
    this.model = Role;
  }
}
