import { Router } from "express";
import { getServicoPorSlug, getServicosProximos } from "../controllers/servicoController";


const router = Router();

router.get("/proximos", getServicosProximos);
router.get("/:slug", getServicoPorSlug);

export default router;
