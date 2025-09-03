import {Router} from "express"
import { createResume } from "../controllers/resume.controller.js"
import verifyJwt from "../middlewares/authentication.js"

const router=Router();

router.post("/create-resume",verifyJwt,createResume);

export default router;