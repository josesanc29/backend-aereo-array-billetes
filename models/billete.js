var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billeteSchema = new Schema({
    vuelo: {type: Schema.Types.ObjectId , ref: 'Vuelo'},
    cliente: {type: Schema.Types.ObjectId , ref: 'Cliente'}
});


module.exports = mongoose.model('Billete', billeteSchema);