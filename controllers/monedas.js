var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monedas');

var monedaSchema = require('../models/moneda');
var Moneda = mongoose.model('Moneda', monedaSchema);

exports.listarMonedas = function(req, res){
  Moneda.find(obtenerMonedas);
  function obtenerMonedas(err, productos) {
    if (err) {
      console.log(err)
      return next()
    }
    return res.render('monedas', {title: 'Lista de Monedas', productos: productos})
  }
};

// Api Listar Monedas
exports.jsonListMonedas = function(req, res){
  return Moneda.find({}, function(err, monedas) {
    if (!err) {
      return res.send(monedas);
    } else {
      return console.log(err);
    }
  });
};

// Api Agregar Moneda
exports.nuevo = function(req, res){
  res.render('nuevo', { title: 'Nuevo' });
  var moneda;
  console.log("POST: ");
  console.log(req.body);
  moneda = new Moneda({
    //titulo: req.body.titulo,
    titulo: 'hola!',
    //imagen: req.body.imagen
    imagen: '/image/image.png'
  });
  moneda.save(function (err) {
  	if (!err) {
    	return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(moneda);
};