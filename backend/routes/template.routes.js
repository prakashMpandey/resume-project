import { addTemplate,getAllTemplates } from "../controllers/template.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

router.post("/add-template",upload.single("thumbnail"),addTemplate)
router.get("/",getAllTemplates)

export default router