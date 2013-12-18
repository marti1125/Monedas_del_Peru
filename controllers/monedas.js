var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monedas');

var monedaSchema = require('../models/moneda');
var Moneda = mongoose.model('Moneda', monedaSchema);

exports.listarMonedas = function(req, res){
  Moneda.find(getMonedas);
  function getMonedas(err, monedas) {
    if (err) {
      console.log(err)
      return next()
    }
    return res.render('monedas', {title: 'Lista de Monedas', monedas: monedas})
  }
};

exports.mostrar_editar = function(req, res, next) {

  // Obtención del parámetro id desde la url
  var id = req.params.id

  Moneda.findById(id, gotMoneda)

  function gotMoneda(err, moneda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    return res.render('mostrar_editar', {title: 'Ver Moneda', moneda: moneda})
  }
};

exports.actualizar = function(req, res, next) {
  var id = req.params.id

  var titulo = req.body.nombre || ''
  var imagen = req.body.descripcion || ''

  // Validemos que nombre o descripcion no vengan vacíos
  if ((titulo=== '') || (imagen === '')) {
    console.log('ERROR: Campos vacios')
    return res.send('Hay campos vacíos, revisar')
  }

  Moneda.findById(id, gotMoneda)

  function gotMoneda(err, moneda) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!moneda) {
      console.log('ERROR: ID no existe')
      return res.send('ID Inválida!')
    } else {
      moneda.titulo = titulo
      moneda.imagen = imagen 

      moneda.save(onSaved)
    }
  }

  function onSaved(err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/moneda/' + id)
  }
}

exports.retirar = function(req, res, next) {
  var id = req.params.id

  Moneda.findById(id, gotMoneda)

  function gotMoneda(err, moneda) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!moneda) {
      return res.send('Invalid ID. (De algún otro lado la sacaste tú...)')
    }

    // Tenemos la moneda, eliminemoslo
    moneda.remove(onRemoved)
  }

  function onRemoved(err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/moneda')
  }
};

exports.agregar = function(req, res, next) {
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

    function onSaved(err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/monedas')
    }
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
exports.nuevoJson = function(req, res){
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