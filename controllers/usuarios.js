const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'No name', apikey} = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        ok: true,
        msg: 'post API - controlador',
        body
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost
}