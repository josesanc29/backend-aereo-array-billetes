var express = require('express');
var app = express();

var Billete = require('../models/billete');

// ==========================================
// Obtener todos los billetes
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Billete.find({},'vuelo cliente')
        .skip(desde)
        .limit(5)
        .populate('vuelo', 'destino salida precio')
        .populate('cliente', 'nombre email vuelo')
        .exec(
            (err, billetes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando billetes',
                        errors: err
                    });
                }

                Billete.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        billetes: billetes,
                        total: conteo
                    });

                })

            });
});
// ==========================================
// Crear un nuevo medico
// ==========================================
app.post('/', (req, res) => {

    var parametros = req.body;

    var billete = new Billete({
        vuelo: parametros.vuelo,
        cliente: parametros.cliente
    });

    billete.save((err, nuevoBillete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear billete',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            billete: nuevoBillete
        });


    });

});


module.exports = app;