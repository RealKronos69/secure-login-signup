import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
await mongoose.connect(process.env.MONGO_URL)
const userschema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'NAME IS REQUIRED'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'EMAIL IS REQUIRED'],
        trim:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:[true,'PASSWORD IS REQUIRED'],
        minlength:[8,'PASSWORD MUST BE ATLEAST 8 CHARACTERS LONG']

    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }

})
const user = mongoose.model('userdetails',userschema)
export default user