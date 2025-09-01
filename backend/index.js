import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log("server on");
    })
  )
  .catch((error) => {
    console.log(error);
  });
