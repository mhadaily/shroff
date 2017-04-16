import exchange from './admin/exchangeComponent/exchange';
import currency from './admin/exchangeComponent/exchange';

export default function setApiRoutes(app) {
  app.use('/api/exchanges', exchange);
  app.use('/api/currencies', currency);
};
