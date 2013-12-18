
/**
 * Module dependencies.
 */

var express = require('express');
var moneda = require('./controllers/monedas');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// Todas las monedas
app.get('/moneda', moneda.listarMonedas);

app.get('/moneda/:id', moneda.mostrar_editar);

app.post('/moneda/:id', moneda.actualizar);

app.get('/retirar-moneda/:id', moneda.retirar);

app.get('/agregar-moneda', moneda.agregar);

app.post('/agregar-moneda', moneda.agregar);

// Api
app.get('/listMonedas', moneda.jsonListMonedas);

// Agregar nueva moneda
app.get('/monedas/agregar', moneda.nuevoJson, function(req, res){
	console.log('guardando..');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});