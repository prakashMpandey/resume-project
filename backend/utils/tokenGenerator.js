import User from "../models/user.model"
import jwt from "jsonwebtoken"

const createAccessToken=async function(userId){
const user=User.findById(userId);

if(!user){
    console.log("user not found");
    return;
}
const accessToken=jwt.sign({
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
    return;
}
const accessToken=jwt.sign({
    email:user.email,
    username:user.username
},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})

if(!accessToken){
    console.log("access token not generated")
    return;
}
return accessToken;
}

export { createAccessToken,createRefreshToken};
