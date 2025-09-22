import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import cors from "cors"

dotenv.config();


const app = express();
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,

}))
connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log("server on");
    })
  )
  .catch((error) => {
    console.log(error);
  });


import userRouter from './routes/user.routes.js'
import resumeRouter from "./routes/resume.routes.js"
import templateRouter from "./routes/template.routes.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/templates",templateRouter)
app.use("/api/v1/resumes",resumeRouter);



