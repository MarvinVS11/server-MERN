const bcrypt= require("bcryptjs");
//const { request } = require("express");
const User= require("../models/user");
const jwt = require("../utils/jwt") 
function register(req, res){
    const {firstname, lastname,email, password}= req.body;
     
    if(!email)res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"La contraseña es obligatoria"});
    // if(!email)
    // {
    //     return res.status(400).send({msg:"El email es obligatorio"});

    // }
    // if(!password) {

    //     return res.status(400).send({msg:"La contraseña es obligatoria"});
    // } 

    const user = new User ({
        firstname,
        lastname,
        email:email.toLowerCase(),
        role:"user",
        active:false,
    });
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword= bcrypt.hashSync(password, salt);
    user.password= hashPassword;
    console.log(user)
    user.save((error, userStorage)=>{
    if(error){
        res.status(400).send({msg:"Error al crear el usuario"});
     }else{
        res.status(200).send(userStorage);
     }
});
  //  res.status(200).send({msg:"TODO OK"});
}

function login(req, res){
    const {email, password}= req.body;
    if(!email) res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"La contrasenia es obligatoria"});
    
    const emailLowerCase = email.toLowerCase();
    //Buscamos el usuario en la base de datos
    User.findOne({email:emailLowerCase}, (error, userStore)=>{
        if(error){
            console.log("Error", error)
            res.status(500).send({msg:"Error en el servidor"});
        }else{
           bcrypt.compare(password, userStore.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg:"Error del servidor"});
            }else if(!check){
                res.status(400).send({msg:"Contraseña incorrecta"});
            }
            else if(!userStore.active){
                res.status(401).send({msg:"Usuario no autorizado o no activo"});
            }
            else{
                res.status(200).send({
                    access:jwt.createAccessToken(userStore),
                    refresh: jwt.createRefreshToken(userStore)

                });
            }
           })
        }
    });
}
function refreshAccessToken(req, res){
    const {token}= req.body;
    if(!token) res.status(400).send({msg:"Token requerido"})
    const {user_id} = jwt.decoded(token);
   // console.log(user_id);
   if(!user_id)
    console.log("usuario", user_id);
    User.findOne({_id: user_id}, (error, userStorage)=>{
        if(error){
           
            res.status(500).send({msg:"Error del servidor"});
        }else{
            res.status(200).send({
                accesToken:jwt.createAccessToken(userStorage)
            });
        }

    })
}
module.exports={
    register,
    login,
    refreshAccessToken
}