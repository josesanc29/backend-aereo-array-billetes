var express = require('express');
var app = express();

var Cliente = require('../models/cliente');
// ==========================================
// Obtener todos los clientes
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Cliente.find({} , 'nombre email vuelo')
        .skip(desde)
        .limit(5)
        .populate('vuelo', 'destino salida precio')
        .populate('billete','vuelo cliente')
        .exec(
            (err, clientes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando clientes',
                        errors: err
                    });
                }

                Cliente.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        clientes: clientes,
                        total: conteo
                    });

                })

            });
});
// ==========================================
// Crear un nuevo cliente
// ==========================================
app.post('/', (req, res) => {

    var parametros = req.body;

    var cliente = new Cliente({
        nombre: parametros.nombre,
        email: parametros.email,
        vuelo: parametros.vuelo,
        billetes:parametros.billetes
    });
    

    cliente.save((err, nuevoCliente) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear cliente',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            cliente: nuevoCliente
        });


    });

});

module.exports = app;