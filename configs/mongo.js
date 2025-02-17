import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        console.log("URI_MONGO:", process.env.URI_MONGO); // 🔍 Verifica si se está cargando

        if (!process.env.URI_MONGO) {
            throw new Error("No se encontró la URI de MongoDB en las variables de entorno.");
        }

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

        console.log("Conexión a la base de datos exitosa");

    } catch (error) {
        console.error("Database connection failed:", error);
    }
};




