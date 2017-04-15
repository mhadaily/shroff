import exchange from './admin/exchangeComponent/exchange';

export default function setApiRoutes(app) {
  app.use('/api/exchanges', exchange);

};
