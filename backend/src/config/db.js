import mongoose from 'mongoose';

const connectDB = async () => {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
        console.error("🔴 No se encontró la cadena de conexión de MongoDB. Establece DB_CONNECTION_STRING o MONGO_URI en el archivo .env.");
        process.exit(1); // Salir del proceso con error para evitar que el servidor se ejecute sin conexión a la base de datos
    }

    try {
        const conn = await mongoose.connect(connectionString);

        console.log(`🟢 MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error("🔴 Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;