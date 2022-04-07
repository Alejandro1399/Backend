const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../models/users')

const loginUser = (req = request, res = response) => {

    const { email, password } = req.body

    res.json({
        msg: 'get API - controlador',

    });
}

const createUser = async (req = request, res = response) => {

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

const modifyUser = async (req = request, res = response) => {

    const { id } = req.params;
    // datos que no quiero actualizar
    const { _id, password, google, email, ...resto } = req.body

    if (password) {
        // Encryptar contraseña 

        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }
    const usuario = await User.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Cambios Realizados',
        usuario

    });
}





module.exports = {
    loginUser,
    createUser,
    modifyUser,
}