"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/perfil", authMiddleware_1.autenticarToken, (req, res) => {
    const usuario = req.usuario;
    res.json({ mensagem: "Acesso autorizado", usuario });
});
exports.default = router;
