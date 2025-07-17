"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
router.get("/me", authMiddleware_1.autenticarToken, usuarioController_1.getPerfil);
router.put("/update", authMiddleware_1.autenticarToken, usuarioController_1.editarPerfil); // Assuming you want to use the same controller for editing profile
router.put("/extensao", authMiddleware_1.autenticarToken, usuarioController_1.editarExtensao);
exports.default = router;
