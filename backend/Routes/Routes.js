const express =require('express');
const router = express.Router();
const UsuarioRoutes = require('./UsuariosRoutes');
router.post('/Usuarios/',UsuarioRoutes.Registrarusuario)
module.exports = router;