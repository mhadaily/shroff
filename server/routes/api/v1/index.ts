import exchange from './admin/exchangeComponent/exchange';
import currency from './admin/exchangeComponent/currency';
import role from './admin/userComponent/role';

export default function setApiRoutes(app) {
  app.use('/api/exchanges', exchange);
  app.use('/api/currencies', currency);
  app.use('/api/roles', role);
};
