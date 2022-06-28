const { Router } = require('express'); //destructurar es básicamente sacar algo que necesitamos en especifico
const { check } = require('express-validator');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = new Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.post('/', [check('correo').custom(existeEmail),
check('nombre', 'El nombre no es válido').not().isEmpty(),
check('password', 'La contraseña no es válida').isLength({min: 6}),
//check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom(esRoleValido),
validarCampos
], usuariosPost);


module.exports = router;