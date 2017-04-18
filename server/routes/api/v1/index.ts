import exchange from './admin/exchangeComponent/exchange';
import currency from './admin/exchangeComponent/currency';
import role from './admin/userComponent/role';

export default function setApiRoutes(app) {
  app.use('/api/v1/exchanges', exchange);
  app.use('/api/v1/currencies', currency);
  app.use('/api/v1/roles', role);
};
