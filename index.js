const mongoose= require("mongoose");
const {DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION}= require("./constants");
const app = require("./app")
const PORT= process.env.POST || 3977;
//mongoose.set("strictQuery", true);
mongoose.connect(
`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
(error)=>{
    if(error) throw error;
  //  console.log("La conexion con la base de datos ha sido exitosa");
  app.listen(PORT,()=>{
      console.log("##############");
      console.log("###API REST###");
      console.log("##############");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
})
}

)