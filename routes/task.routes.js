
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getTask,
    createTask,
    getTask_id,
    modifyTask,
} = require('../controllers/task.controllers')
const { existId, existTaskId } = require('../helpers/db-validate');
const { validarCampos } = require('../middlewares/validate');

const router = Router();

// Debe obtener todas las tareas.
router.get('/task', getTask);

// Obtener tareas por id de usuario
router.get('/task/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existId),
    validarCampos
], getTask_id);

//Debe crear una nueva tarea
router.post('/task', [
    check('task_name', 'El nombre de la tarea es requerido').not().isEmpty(),
    check('user_id', 'El id del usuario es requerido').not().isEmpty(),
    check('user_id', 'No es un id valido').isMongoId(),
    validarCampos
], createTask);

// modificar el estado de la tarea por id
router.patch('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existTaskId),
    check('task_state', 'No es un estado permitido').isIn(['To Do', 'in Progress', 'Done']),
    validarCampos
], modifyTask);











module.exports = router;