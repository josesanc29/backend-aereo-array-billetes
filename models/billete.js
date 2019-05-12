var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var billeteSchema = new Schema({
    vuelo: {type: Schema.Types.ObjectId , ref: 'Vuelo'},
    cliente: {type: Schema.Types.ObjectId , ref: 'Cliente'},
    fechaTotal:{type: String},
    creadoFecha: {type: String},
    creadoHora: {type: String},
});


module.exports = mongoose.model('Billete', billeteSchema);