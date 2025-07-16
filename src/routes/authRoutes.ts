import { Router } from "express";
import * as auth from "../controllers/authController";

const router = Router();

router.post("/signup", auth.registrar);
router.post("/signin", auth.autenticar);

export default router;
