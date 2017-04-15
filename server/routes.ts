import ExchangeCtrl from './controllers/exchange';

export default function setRoutes(app) {

  const exchange = new ExchangeCtrl();

  // API
  app.route('/api/exchanges')
     .get(exchange.getAll)
     .post(exchange.insert);
  app.route('/api/exchanges/count')
     .get(exchange.count);
  app.route('/api/exchanges/:id')
     .get(exchange.get)
     .put(exchange.update)
     .delete(exchange.remove);

}
