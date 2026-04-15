import "dotenv/config";
import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
// Fix: Se fuerza DNS de Google en Node para evitar error ECONNREFUSED en resolución SRV de MongoDB Atlas (problema con resolver del ISP) Se utiliza solo para local.
import dns from 'node:dns';
if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors()); //Habilitar el server para trabajar con JSON
app.use(express.json()); //Habilitar el server para trabajar con JSON


// Rutas
app.use("/users", usersRouter); // Ruta para operaciones CRUD de usuarios
app.use("/auth", authRouter); // Ruta para autenticación (login)

app.get("/", (req, res) => {
    res.status(200).send("API funcionando 🚀"); //
});

// Comprobar que el servidor está corriendo.
app.listen(PORT, () => {
    console.log(`Server está corriendo en el puerto ${PORT}`);
});