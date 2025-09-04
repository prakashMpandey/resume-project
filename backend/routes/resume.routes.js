import {Router} from "express"
import { createResume, deleteResume, getResume, getUserAllResume, updateResume } from "../controllers/resume.controller.js"
import verifyJwt from "../middlewares/authentication.js"

const router=Router();

router.post("/",verifyJwt,createResume);
router.put("/:resumeId",verifyJwt,updateResume);
router.get("/",verifyJwt,getUserAllResume);
router.get("/:resumeId",verifyJwt,getResume);
router.delete("/:resumeId",verifyJwt,deleteResume);


export default router;