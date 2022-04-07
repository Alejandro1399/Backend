const { Schema, model } = require('mongoose')

const taskSchema = Schema({

    task_name: {
        type: String,
        required: [true, 'El nombre de la tarea es obligatorio']
    },
    task_state: {
        type: String,
        required: true,
        enum: ['To Do', 'in Progress', 'Done']
    },

});

module.exports = model('Task', taskSchema)