const { Router } = require('express'); //destructurar es básicamente sacar algo que necesitamos en especifico
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/usuarios');

const router = new Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.post('/', usuariosPost);


module.exports = router;