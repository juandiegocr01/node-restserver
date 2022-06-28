const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {


    //obtenemos el total de los registros, todos los registros y el limite de registros que queremos ver

  //  const {q, nombre = 'No name', apikey} = req.query;

  const { limite = 5, desde = 0} = req.query; //esto trae un parametro por URL
  const query = {estado:true}

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])

    res.json({
        total, usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPost = async (req, res = response) => {

    

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    //verificar el correo exista
   /* const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya existe'
        });
    } */

    //encriptar contra
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //fisicamente borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //borrado ilusionista

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost
}