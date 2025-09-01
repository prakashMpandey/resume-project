import express,{json, urlencoded} from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();


const app=express()
app.use(cookieParser());
app.use(json())
app.use(urlencoded({extended:true}))



app.listen(process.env.PORT,()=>{
    console.log("server on")
})