const Role = require('../models/roles')
const User = require('../models/users')


const isRoleValidate = async (role = "") => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error(`El rol: ${role} no esta registrado en la base de datos`)
    }
}

const existEmail = async (email = "") => {
    const exist = await User.findOne({ email })
    if (exist) {
        throw new Error(`El correo: ${email} ya esta registrado en la base de datos`)
    }
}

module.exports = {
    isRoleValidate,
    existEmail
}