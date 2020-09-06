import { Application } from 'express';

//* importo produt y users ROUTE
import productsRoutes from './products-routes';
import usersRoutes from './users-routes';

//funcion que sera exportada y recibe como parametro una aplicacion de express
export default (app: Application): void => {
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/products', productsRoutes);
};
