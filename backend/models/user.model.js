import {Schema,model} from "mongoose"
import bcrypt from "bcryptjs"
const saltRounds=10;
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    refreshToken:{
        type:String,
        default:null,
        select:false
    }
},{
    timestamps:true,
});



userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,saltRounds)
})

userSchema.methods.isValidPassword=async function(password){
    const result= await bcrypt.compare(password,this.password);
    return result;
}


export const User=model("User",userSchema);
