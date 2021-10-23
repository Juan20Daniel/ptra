const express =require('express');
const UsuarioRoutes = express.Router();
const UsuarioController=require('../Controllers/UsuariosController');
UsuarioRoutes.Registrarusuario=(UsuarioController.PostUsuarios);

module.exports = UsuarioRoutes;