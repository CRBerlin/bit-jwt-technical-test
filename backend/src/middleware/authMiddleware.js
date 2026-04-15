import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // 1. Obtener token del header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        // 2. Formato: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token inválido" });
        }

        // 3. Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Guardar info del usuario en request
        req.user = decoded;

        // 5. Continuar
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado", error: error.message });
    }
};

export default authMiddleware;