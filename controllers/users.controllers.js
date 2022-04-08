const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../models/users')
//todo
const usuariosGet = async (req = request, res = response) => {
    const users = []
    const usuario = await User.find({ role: 'Operario' })
    usuario.forEach(element => {
        users.push({ id: element._id, name: element.name, })

    });
    res.json({
        users
    });
}

const loginUser = async (req = request, res = response) => {

    const { email, password } = req.body

    const usuario_info = await User.findOne({ email })

    const compare = await bcrypt.compare(password, usuario_info.password)

    if (!compare) {
        return res.status(404).json({
            msg: "La contraseña es incorrecta"
        })
    }

    const { _id, name, role, state, img } = usuario_info
    res.json({
        _id, name, role, state, img,
        token: true

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
        msg: "El usuario fue registrado con exito "
    });
}

const modifyUser = async (req = request, res = response) => {

    const { id } = req.params;
    // datos que no quiero actualizar
    const { _id, password, google, email, img, ...resto } = req.body

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
    usuariosGet
}