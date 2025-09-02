
import User from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js"
import {createAccessToken,createRefreshToken} from "../utils/tokenGenerator.js"


const registerUser=async(req,res)=>{
    const {email,username,password}=req.body;

    if([email,username,password].some((field)=>(
        field?.trim()===''
    ))){   
        return res.json(new ApiResponse(400,null,"all fields are required"))
    }

    const existingUser=await User.findOne({$or:[{username},{email}]})
    
    if(existingUser){
        return res.json(new ApiResponse(400,null,"user already exists"));
    }

    const createdUser=await User.create({
        email,username,password
    })
    if(!createdUser){
        return res.status(500).json(new ApiResponse(500,null,"user cannot be created"))
    }
    const accessToken=createAccessToken(createdUser._id);
    const refreshToken=createRefreshToken(createdUser._id);

    if(!accessToken){
        return res.status(500).json(new ApiResponse(500,null,"something went wrong"))
    }
    if(!refreshToken){
        return res.json(new ApiResponse(500,null,"something went wrong"))
    }

    const options={
        httpOnly:true,
        secure:true,
        sameSite:none,
        maxAge:1*60*60*1000

    }

    res.cookie("accessToken",accessToken,{options})
    res.cookie("refreshToken",refreshToken,{options})
    return res.json(new ApiResponse(200,createdUser,"user created successfully"))
}

const loginUser=async(req,res)=>{
    const {input,password}=req.body;

    if(!input || !password){

        return res.status(400).json(new ApiResponse(400,null,"all fields are required"))
    }

    const user=await User.findOne({$or:[{input},{input}]}).select("+password");

if(!user){
    return res.status(400).json(new ApiResponse(400,null,"no user found"))
}

const isPasswordCorrect=await User.isValidPassword(password,user.password);

if(!isPasswordCorrect){
    return res.status(400).json(new ApiResponse(400,null,"invalid password"));
}
const accessToken=createAccessToken(user._id);
const refreshToken=createRefreshToken(user._id);

if(!accessToken){
    console.log("access token not generated");
    throw new Error("access token not found")
}
if(!refreshToken){
    console.log("refresh token not found");
    throw new Error("refresh token not found")
}

const options={
        httpOnly:true,
        secure:true,
        sameSite:none,
        maxAge:1*60*60*1000

    }
    
user.password=undefined
user.refreshToken=undefined

res.cookie("accessToken",accessToken,{options})
    res.cookie("refreshToken",refreshToken,{options})
    return res.json(new ApiResponse(200,user,"user created successfully"))

}

const logOutUser=async(req,res)=>{
    const userId=req?.user._id;

    await User.findByIdAndUpdate(userId,{
        $set:{
            refreshToken:null
        }
    })

      const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    };

    res.clearCookie("accessToken",{options})
    res.clearCookie("refreshToken",{options});

    return res.status(200).json(new ApiResponse(200,null,"user logged out successfully"))
    
}

export {registerUser,logOutUser,loginUser};

