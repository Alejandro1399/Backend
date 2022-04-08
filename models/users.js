const { Schema, model } = require('mongoose')

const userSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        required: true,
        enum: ['Administrador', 'Operario']
    },
    img: {
        type: Schema.Types.Buffer,
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function () {
    const { __v, ...user } = this.toObject();
    return user
}

module.exports = model('User', userSchema)