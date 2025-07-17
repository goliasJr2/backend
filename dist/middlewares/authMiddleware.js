"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = autenticarToken;
const jwt_1 = require("../utils/jwt");
function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ erro: "Token não fornecido." });
        return;
    }
    try {
        const payload = (0, jwt_1.verificarToken)(token); // agora tem tipo garantido
        req.usuario = payload;
        next();
    }
    catch (err) {
        res.status(403).json({ erro: "Token inválido ou expirado." });
        return;
    }
}
