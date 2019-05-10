var express = require('express');

var app = express();
var Vuelo = require('../models/vuelo');
var Cliente = require('../models/cliente');


// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'vuelo':
            promesa = buscarVuelos(busqueda, regex);
            break;
        case 'cliente':
            promesa = buscarClientes(busqueda , regex);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: comics',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarVuelos(busqueda, regex),
            buscarClientes(busqueda , regex),
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                vuelo: respuestas[0],
                cliente: respuestas[1]
            });
        })


});

function buscarVuelos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Vuelo.find({}, 'destino salida llegada precio')
            .or([{ 'destino': regex }, { 'salida': regex }, { 'llegada': regex },{'precio': regex}])
            .exec((err, vuelo
                ) => {

                if (err) {
                    reject('Erro al cargar vuelos', err);
                } else {
                    console.log(vuelo);
                    resolve(vuelo);
                }


            })


    });
}

function buscarClientes(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Cliente.find({},'nombre email vuelo billetes')
            .or([{ 'nombre': regex }, { 'email': regex }, {'vuelo': regex}, {'billetes': regex}])
            .exec((err, clientes) => {

                if (err) {
                    reject('Erro al cargar clientes', err);
                } else {
                    resolve(clientes);
                }


            })


    });
}

// function buscarTiendas(busqueda, regex) {

//     return new Promise((resolve, reject) => {

//         Tienda.find({}, 'titulo precio enStock vendido')
//             .or([{ 'titulo': regex }, { 'precio': regex }])
//             .exec((err, tiendas) => {

//                 if (err) {
//                     reject('Erro al cargar tiendas', err);
//                 } else {
//                     resolve(tiendas);
//                 }


//             })


//     });
// }


module.exports = app;