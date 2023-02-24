const mongoose= require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const NewsLetterSchema= mongoose.Schema({
    email:{
        type:String,
        unique:true,
         }
});

NewsLetterSchema.plugin(mongoosePaginate);

module.exports= mongoose.model("Newletter", NewsLetterSchema);