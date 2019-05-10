var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre: { type: String },
    email: { type: String },
    vuelo: { type: Schema.ObjectId , ref: 'Vuelo'},
    billetes: [{ type: Schema.ObjectId , ref:'Billete'}]
});


module.exports = mongoose.model('Cliente', clienteSchema);