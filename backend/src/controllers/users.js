import bcrypt from "bcrypt";
import usersModel from "../models/users.js";
const usersController = {
    create: async (req, res) => {
        try {
            const { name, email, password, role, plan, planStatus, isActive, currentSessionIndex, streakCount, lastCompletedDate } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email y password son obligatorios"
                });
            }
            const newUser = new usersModel({
                name,
                email,
                password: hashedPassword,
                role,
                plan,
                planStatus,
                isActive,
                currentSessionIndex,
                streakCount,
                lastCompletedDate
            });
            const existingUser = await usersModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: "El email ya está registrado"
                });
            }
            await newUser.save();
            res.status(201).json({ message: "Usuario creado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario. Error= " + error })
        }
    },
    readAll: async (req, res) => {
        try {

            let users;

            //Admin ve todos
            if (req.user.role === "admin") {
                users = await usersModel.find().select("-password");

            } else {
                //Trainer y User, solo se ven a sí mismos
                users = await usersModel.find({
                    _id: req.user.id
                }).select("-password");
            }

            res.status(200).json({ data: users });

        } catch (error) {
            res.status(500).json({
                message: "Error interno del servidor", error: error
            });
        }
    },
    read: async (req, res) => {
        try {
            const { id } = req.params;
            if (req.user.role !== "admin" && req.user.id !== id) {
                return res.status(403).json({
                    message: "No tienes permisos para ver este usuario"
                });
            }
            const userFound = await usersModel.findById(id).select("-password");
            if (userFound) {
                res.status(201).json({ data: userFound });
            } else {
                res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al leer el usuario. Error. " + error })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;

            let { name, email, password, role, plan, planStatus, isActive, currentSessionIndex, streakCount, lastCompletedDate } = req.body;
            //Validación de permisos: solo admin o el propio usuario pueden actualizar
            if (req.user.role !== "admin" && req.user.id !== id) {
                return res.status(403).json({
                    message: "No tienes permisos para actualizar este usuario"
                });
            }
            if (password) {
                password = await bcrypt.hash(password, 10);
            }
            const userUpdated = await usersModel.findByIdAndUpdate(id, {
                name,
                email,
                password,
                role,
                plan,
                planStatus,
                isActive,
                currentSessionIndex,
                streakCount,
                lastCompletedDate
            },
                { new: true } //Devuelve el actualizado
            );
            if (userUpdated) {
                res.status(201).json({ message: "Usuario actualizado correctamente." });
            } else {
                res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el usuario. Error. " + error })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const userDeleted = await usersModel.findByIdAndDelete(id);
            if (userDeleted) {
                res.status(201).json({ message: "Usuario eliminado correctamente." });
            } else {
                res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el usuario. Error. " + error })
        }
    },
};

export default usersController;