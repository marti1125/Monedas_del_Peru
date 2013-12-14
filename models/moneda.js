var Schema = require('mongoose').Schema;

var monedaSchema = new Schema({
  titulo:  String,
  imagen: String,
  fecha: { type: Date, default: Date.now }
});


module.exports = monedaSchema