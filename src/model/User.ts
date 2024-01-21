import mongoose,{Schema} from "mongoose";

const userschema=new Schema(
    {
        username:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
    }
    }
)

const user=mongoose.model("user",userschema)
export default user
