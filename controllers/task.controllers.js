const { response, request } = require('express');

const Tasks = require('../models/tasks');
const User = require('../models/users')

const getTask = async (req = request, res = response) => {
    const tarea = await Tasks.find()

    res.json({
        tarea
    });
}
const getTask_id_task = async (req = request, res = response) => {
    const { id } = req.params;
    const tarea = await Tasks.findById(id)
    const usuario = await User.findById(tarea.user_id)
    res.json({
        tarea,
        usuario
    });
}

const createTask = async (req, res = response) => {

    const { task_name, user_id } = req.body
    const tarea = new Tasks({ task_name, user_id });


    // Guardar en db
    await tarea.save();
    res.json({
        msg: " Tarea registrada con exito",
        tarea
    });
}

const getTask_id = async (req, res = response) => {
    const { id } = req.params;
    const tarea = await Tasks.find({ user_id: id })
    res.json({
        tarea
    });
}


const modifyTask = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, user_id, ...resto } = req.body
    const tarea = await Tasks.findByIdAndUpdate(id, resto)
    res.json({
        msg: 'Cambios Realizados',
        tarea
    });
}

module.exports = {
    getTask,
    createTask,
    getTask_id,
    modifyTask,
    getTask_id_task,
}