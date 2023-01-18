const jwt= require("../utils/jwt");

function asureAuth(req, res, next){
  
  if(!req.headers.authorization){
    return res.status(403)
              .send({msg:"La peticion no tiene la cabecera de autenticacion"});
  }
     
    const token = req.headers.authorization.replace("Bearer ", "");
   // console.log("token",token)
    try {
        const payload =jwt.decoded(token);
        const {exp}= payload;
        const currentData = new Date().getTime();
        if(exp <= currentData){
            return res.status(400).send({msg:"El Token ha caducado"})
        }
        req.user =payload;//capacidad del usuario de llegar a la funcio getMe
        next();
    } catch (error) {
        res.status(400).send({msg: "Token invalido"})
        
    }
   

}
module.exports={
    asureAuth
}