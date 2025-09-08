import { loginUser,registerUser,logOutUser } from "../controllers/user.controller.js";
import { Router } from "express";
import verifyJwt from "../middlewares/authentication.js"
const router=Router();

router.post("/signup",registerUser);
router.post("/signin",loginUser);
router.post("/logout",verifyJwt,logOutUser);
router.get("/user",verifyJwt,logOutUser);

export default router;