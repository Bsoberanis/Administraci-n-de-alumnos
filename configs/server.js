'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import limiter from "../src/middlewares/validar-cant-peticiones.js"
import * as authRoutes from "../src/service/user.controller.js";
import userRoutes from "../src/service/user.route.js"

export const middlewares = (app)=>{
    app.use(express.urlencoded({extended:false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

export const routes = (app) =>{
    app.use('/academySystem/v1/auth' , authRoutes)
    app.use('/academySystem/v1/user', userRoutes)
}

export const conectarDB = async()=>{
    try {
        await dbConnection();
        console.log('Conexion a la base de datos exitosa');
    } catch (error) {
        console.error('Error conectando a la base de datos',error);
        process.exit(1);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.port || 3001;

    try {
        middlewares(app);
        conectarDB();
        app.listen(port);
        routes(app);
        console.log(`Server running on port ${port}`);
    } catch (e) {
        console.log(`Server init failed: ${e}`);
    }
};

