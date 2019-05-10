var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vueloSchema = new Schema({
    destino:{type: String , required: true},
    salida:{type: Number , required: true},
    llegada:{type: Number , required: true},
    precio:{type: Number , required: true}
});


module.exports = mongoose.model('Vuelo', vueloSchema);