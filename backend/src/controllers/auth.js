import usersModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // 1. Buscar usuario (incluyendo password)
            const user = await usersModel.findOne({ email }).select("+password");

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // 2. Comparar contraseña
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }

            // 3. Generar token
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // 4. Respuesta con token y datos del usuario (sin password)
            res.json({
                message: "Login exitoso",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            res.status(500).json({ error: "Error en login: " + error });
        }
    }
};

export default authController;