var express = require('express');
var app = express();

var Vuelo = require('../models/vuelo');
// ==========================================
// Obtener todos los vuelos
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Vuelo.find({}, 'destino salida llegada precio')
        .skip(desde)
        .limit(7)
        .exec(
            (err, vuelos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando vuelos',
                        errors: err
                    });
                }

                Vuelo.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        vuelos: vuelos,
                        total: conteo
                    });

                })

            });
});
// ==========================================
// Crear un nuevo vuelo
// ==========================================
app.post('/', (req, res) => {

    var parametros = req.body;

    var vuelo = new Vuelo({
        destino: parametros.destino,
        salida: parametros.salida,
        llegada: parametros.llegada,
        precio: parametros.precio
    });

    vuelo.save((err, nuevoVuelo) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear vuelo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            vuelo: nuevoVuelo
        });


    });

});


module.exports = app;