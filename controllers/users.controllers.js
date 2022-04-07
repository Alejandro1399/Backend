const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../models/users')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const createUser = async (req, res = response) => {

    const { name, email, password, role } = req.body
    const usuario = new User({ name, email, password, role });



    // Encryptar contraseña 

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)


    // Guardar en db
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    createUser,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}