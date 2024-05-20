import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./src/routes/tasks.routes.js";

import { dbConection } from "./src/database/dbConection.js";

const app = express();

dotenv.config();

const api = async () => {
    await dbConection();

    app.use(cors());
    app.use(express.json());
    app.use("/api/tasks", taskRoutes);

    app.listen(process.env.PORT, () =>
        console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
    );
};

api();
