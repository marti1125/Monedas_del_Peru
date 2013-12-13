
/*
 * Agregar nueva moneda
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monedas');

var Schema = mongoose.Schema;

var monedaSchema = new Schema({
  titulo:  String,
  imagen: String,
  fecha: { type: Date, default: Date.now }
});

mongoose.model('Moneda', monedaSchema);

var Moneda = mongoose.model('Moneda');

exports.monedas = function(req, res){
  Moneda.find(getMonedas);
  function getMonedas(err, productos) {
    if (err) {
      console.log(err)
      return next()
    }
    return res.render('monedas', {title: 'Lista de Monedas', productos: productos})
  }
};

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

// Api Listar Monedas
exports.listMonedas = function(req, res){
  return Moneda.find({}, function(err, monedas) {
    if (!err) {
      return res.send(monedas);
    } else {
      return console.log(err);
    }
  });
};