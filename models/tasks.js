const { Schema, model } = require('mongoose')

const taskSchema = Schema({

    task_name: {
        type: String,
        required: [true, 'El nombre de la tarea es obligatorio']
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El id del usuario es necesario de la tarea es obligatorio']
    },

    task_state: {
        type: String,
        enum: ['To Do', 'in Progress', 'Done'],
        default: 'To Do',
    },

});

taskSchema.methods.toJSON = function () {
    const { __v, ...task } = this.toObject();
    return task
}


module.exports = model('Task', taskSchema)