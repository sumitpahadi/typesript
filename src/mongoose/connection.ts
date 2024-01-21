import mongoose from "mongoose";

const client=(url:string):void=>{
    mongoose.connect(url)
    .then(()=>console.log("mongoose is connected"))
    .catch((error:any)=>console.log(error))
}
export default client

