"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicoController_1 = require("../controllers/servicoController");
const router = (0, express_1.Router)();
router.get("/proximos", servicoController_1.getServicosProximos);
router.get("/:slug", servicoController_1.getServicoPorSlug);
exports.default = router;
