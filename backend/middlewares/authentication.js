
import User from "../models/user.model"
import jwt from "jsonwebtoken"
 const authenticate=async(req,res,next)=>{
    const token=req.cookie?.accessToken;

    if(!accessToken){
        return res.json({error:401,message:"unauthorized access"});
    }
   
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user=await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user){
        res.status(401).json(new ApiError(401,"access denied"));
    }
    req.user=user;

    next();
}

export default authenticate;