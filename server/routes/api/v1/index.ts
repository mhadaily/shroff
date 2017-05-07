import exchange from './admin/exchangeComponent/exchange';
import currency from './admin/exchangeComponent/currency';
import user from './admin/userComponent/user';
import role from './admin/userComponent/role';
import media from './admin/mediaComponent/media';

export default function setApiRoutes(app) {
  app.use('/api/v1/exchanges', exchange);
  app.use('/api/v1/currencies', currency);
  app.use('/api/v1/roles', role);
  app.use('/api/v1/users', user);
  app.use('/api/v1/media', media);
};
