
const { Router } = require('express');
const { check } = require('express-validator');

const {
    loginUser,
    modifyUser,
    createUser,
} = require('../controllers/users.controllers');

const {
    isRoleValidate,
    existEmail,
    existId,
    existEmailLogin
} = require('../helpers/db-validate');
const { validarCampos } = require('../middlewares/validate');

const router = Router();


// router.post('/', usuariosGet);

router.patch('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existId),
    check('role').custom(isRoleValidate),
    validarCampos
], modifyUser);

router.post('/user', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    // check('role', 'No es un rol permitido').isIn(['Administrador', 'Operario']),
    check('email').custom(existEmail),
    check('role').custom(isRoleValidate),
    validarCampos,
], createUser);


router.post('/auth/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmailLogin),
    validarCampos,
], loginUser);

// router.delete('/', usuariosDelete);

// router.patch('/user', usuariosPatch);





module.exports = router;