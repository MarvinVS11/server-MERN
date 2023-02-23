const mongoose= require("mongoose");

const NewsLetterSchema= mongoose.Schema({
    email:{
        type:String,
        unique:true,
         }
});

module.exports= mongoose.model("Newletter", NewsLetterSchema);