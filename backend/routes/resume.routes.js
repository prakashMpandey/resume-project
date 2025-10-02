import {Router} from "express"
import { createResume,updateResumeSection, deleteResume, getResume, getUserAllResume, updateResumeThumbNail, saveResume, updateResumeImage } from "../controllers/resume.controller.js"
import verifyJwt from "../middlewares/authentication.js"
import { upload } from "../middlewares/multer.middleware.js";
const router=Router();

router.post("/",verifyJwt,createResume);
router.put("/:resumeId",verifyJwt,updateResumeSection);
router.patch("/:resumeId",verifyJwt,upload.single("thumbnail"),updateResumeThumbNail);
router.get("/",verifyJwt,getUserAllResume);
router.get("/:resumeId",verifyJwt,getResume);
router.delete("/:resumeId",verifyJwt,deleteResume);
router.post("/:resumeId/resume-image",verifyJwt,upload.single("resumeImage"),updateResumeImage)

router.post("/check/:resumeId",verifyJwt,saveResume)


export default router;