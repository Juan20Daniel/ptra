const UsuarioModel = require('../Modelos/UsuariosModel');
const UsuarioController ={}


UsuarioController.PostUsuarios =  async (req,res)=>{  
    console.log("gato");
    const {Nombre,Correo,Contraseña,password_conf,imagen,Sexo,Edad,Telefono}=(req.body);
    console.log( {Nombre,Correo,Contraseña,password_conf,imagen,Sexo,Edad,Telefono});
    const errors = [];
    const guardado = [];
console.log({Nombre,Contraseña});
  /*  if(!Nombre){
        res.send({message: 'El campo del primer nombre no puede estar vacío','success':false,});
        errors.push({ text: 'El campo del primer nombre no puede estar vacío','success':false});
    }

    
    
    if (!Correo) {
        res.send({message: 'El campo email no puede estar vacío','success':false,});
        errors.push({ text: 'El campo email no puede estar vacío','success':false});
    } 
    if(!/^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/i.test(Correo)){
        throw res.send({'success':false,message: 'El formato de gmail no es válido '});
        errors.push({ text: 'El formato de gmail no es válido '});
    }
  
    if (!Contraseña ) {
        res.send({message: 'El campo contraseña no puede estar vacío','success':false,});
        errors.push({ text: 'El campo contraseña no puede estar vacío','success':false});
    } 
    if(Contraseña.length<4){
        res.send({message: 'La contraseña tiene que se mayor a 4 dígitos','success':false,});
        errors.push({ text: 'La contraseña tiene que se mayor a 4 dígitos','success':false});        
    }
    if(!password_conf){
        res.send({message: 'La contraseña de verificación no puede estar vacío','success':false,});
        errors.push({ text: 'La contraseña de verificación no puede estar vacío','success':false});
    }
    if(password_conf.length<4){
        res.send({message:'La contraseña de verificación  tiene que se mayor a 4 dígitos','success':false,});
        errors.push({ text: 'La contraseña de verificación  tiene que se mayor a 4 dígitos'});        
    }
    if(Contraseña != password_conf){
        res.send({message: 'La contraseña no coincide' ,'success':false});
        errors.push({ text: 'La contraseña no coincide','success':false});
    }  
    if (errors.length > 0) {
        console.log({errors,});
    } 
    else {
        const emailUsuario =await UsuarioModel.findOne({Correo:Correo});
        if(emailUsuario) {res.send({message:"El gmail ya fue registrado con anterioridad",'success':false});
        errors.push({message:"El gmail ya fue registrado con anterioridad",'success':false});
        } 
        else {
            res.send({message:'Ya fuistes registrado con éxito :)','success':true});
            guardado.push({message:'Ya fuistes registrado con éxito :)','success':true});
            const usuario = await new UsuarioModel({Contraseña:bcrypt.hashSync(Contraseña,10),Nombre,Correo,imagen,Sexo,Edad,Telefono});
            res.json(await usuario.save());
        } 
    }*/
} 

module.exports=UsuarioController;