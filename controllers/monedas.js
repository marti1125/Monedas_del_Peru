var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monedas');

var monedaSchema = require('../models/moneda');
var Moneda = mongoose.model('Moneda', monedaSchema);

exports.listarMonedas = function(req, res){
  Moneda.find(getMonedas);
  function getMonedas(err, productos) {
    if (err) {
      console.log(err)
      return next()
    }
    return res.render('monedas', {title: 'Lista de Monedas', productos: productos})
  }
};

exports.create = function (req, res, next) {
  if (req.method === 'GET') {
    return res.render('show_edit', {title: 'Nueva Moneda', producto: {}})
  } else if (req.method === 'POST') {
    // Obtenemos las variables y las validamos
    var titulo = req.body.titulo || ''
    var imagen = req.body.imagen || ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((titulo=== '') || (imagen === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

    // Creamos el documento y lo guardamos
    var moneda = new Moneda({
        titulo : titulo
      , imagen : imagen
    })

    moneda.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/monedas')
    }
  }
}

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