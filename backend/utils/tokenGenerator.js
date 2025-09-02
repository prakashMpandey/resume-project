import User from "../models/user.model"
import jwt from "jsonwebtoken"

const createAccessToken=async function(userId){
const user=User.findById(userId);

if(!user){
    console.log("user not found");
    return;
}
const accessToken=jwt.sign({
    _id:user._id,
    email:user.email,
    username:user.username
},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})

if(!accessToken){
    console.log("access token not generated")
    return;
}
return accessToken;
}

const createRefreshToken=async function(userId){
const user=User.findById(userId);

if(!user){
    console.log("user not found");
    return ;
}
const refreshToken=jwt.sign({
    email:user.email,
    username:user.username
},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})

if(!refreshToken){
    console.log("access token not generated")
    return ;
}
user.refreshToken=refreshToken;
await user.save({validateBeforeSave:false});
return refreshToken;

}

export { createAccessToken,createRefreshToken};
