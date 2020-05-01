const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();
//Tipos de parametros:

//Query Params(get): req.query (Filtros, paginacao,...) 
//Route Params(put,delete): request.params (identificar recurso na alteracao ou remocao)
//Body(post,put): request.body ()

//index(lista), show, store, update, destroy
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;