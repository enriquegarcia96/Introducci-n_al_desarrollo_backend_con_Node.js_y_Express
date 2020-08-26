//* importo produt y users ROUTE
const productsRoutes = require('./products-routes')
const usersRoutes = require('./users-routes')

//funcion que sera exportada y recibe como parametro una aplicacion de express
module.exports = app =>{
     app.use('/api/v1/users', usersRoutes)
     //app.use('/api/v1/products', productsRoutes)
}
