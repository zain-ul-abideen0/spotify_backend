const mongoose=require("mongoose")
const PlayList=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:false,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    songs:[
    {
        type:mongoose.Types.ObjectId,
        ref:"songs",
    }
],
   collabartors:[{
    type:mongoose.Types.ObjectId,
    ref:"user",

   }]
    
})

const PlayListModel=mongoose.model("PlayList",PlayList)
module.exports=PlayListModel;